#!/usr/bin/env node
/**
 * Export FraternitasQ referral network as Cytoscape JSON.
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=./service-account.json \
 *     node scripts/export-cytoscape.mjs --project fraternitasv2 --out network.json
 *
 * Or with explicit service account path:
 *   node scripts/export-cytoscape.mjs \
 *     --service-account ./service-account.json \
 *     --project fraternitasv2 \
 *     --out network.json
 *
 * Output schema (Cytoscape standard):
 *   {
 *     "elements": {
 *       "nodes": [{ "data": { id, ambassador_code, ... metrics } }, ...],
 *       "edges": [{ "data": { id, source, target } }, ...]
 *     }
 *   }
 *
 * Node metrics computed (per Anexo II — Sistema de Medición de Aporte Social):
 *   - referrals_count           Volumen: respuestas únicas atribuidas a su código.
 *   - avg_word_count            Profundidad: promedio de palabras de los referidos.
 *   - own_word_count            Profundidad propia.
 *   - in_degree / out_degree    Topología del grafo dirigido.
 *
 * The script is read-only and safe to run repeatedly.
 */

import { readFileSync } from 'node:fs';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import admin from 'firebase-admin';

const { values } = parseArgs({
  options: {
    project: { type: 'string' },
    out: { type: 'string', default: 'network.json' },
    'service-account': { type: 'string' },
    collection: { type: 'string', default: 'respuestas_fraternidad' },
  },
});

const projectId = values.project;
if (!projectId) {
  console.error('Missing --project <projectId>');
  process.exit(1);
}

// Init Admin SDK
const saPath = values['service-account'] || process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (saPath) {
  const serviceAccount = JSON.parse(readFileSync(resolve(saPath), 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId,
  });
} else {
  // Falls back to ADC (gcloud auth application-default login)
  admin.initializeApp({ projectId });
}

const db = admin.firestore();

const wordCount = (s) =>
  typeof s === 'string'
    ? s.trim().split(/\s+/).filter(Boolean).length
    : 0;

async function main() {
  const snap = await db.collection(values.collection).get();
  console.error(`Loaded ${snap.size} responses from "${values.collection}"`);

  // Pass 1 — index docs by ambassador_code (a respondent may exist with no code in legacy rows).
  const docs = [];
  const byAmbassador = new Map();
  for (const d of snap.docs) {
    const data = d.data();
    const own_words =
      wordCount(data.experience_lived) +
      wordCount(data.limits_and_tensions) +
      wordCount(data.future_and_technology);
    const row = {
      doc_id: d.id,
      ambassador_code: data.ambassador_code || null,
      referrer_code: data.referrer_code || 'Organico',
      community_affiliation: data.community_affiliation || null,
      lodge_name: data.lodge_name || null,
      age_range: data.age_range || null,
      gender: data.gender || null,
      location: data.location || null,
      submission_timestamp: data.submission_timestamp?.toDate?.()?.toISOString() ?? null,
      own_word_count: own_words,
    };
    docs.push(row);
    if (row.ambassador_code) byAmbassador.set(row.ambassador_code, row);
  }

  // Pass 2 — compute referral metrics.
  const referredBy = new Map(); // ambassador_code -> [docs they referred]
  for (const row of docs) {
    if (row.referrer_code && row.referrer_code !== 'Organico') {
      if (!referredBy.has(row.referrer_code)) referredBy.set(row.referrer_code, []);
      referredBy.get(row.referrer_code).push(row);
    }
  }

  // Build nodes
  const nodes = [];
  // Synthetic root for organic respondents (no inbound edge).
  let hasOrganic = false;

  for (const row of docs) {
    const referrals = row.ambassador_code ? referredBy.get(row.ambassador_code) || [] : [];
    const avg_word_count =
      referrals.length > 0
        ? Math.round(referrals.reduce((a, r) => a + r.own_word_count, 0) / referrals.length)
        : 0;

    nodes.push({
      data: {
        id: row.doc_id,
        label: row.ambassador_code || row.doc_id.substring(0, 8),
        ambassador_code: row.ambassador_code,
        community_affiliation: row.community_affiliation,
        lodge_name: row.lodge_name,
        age_range: row.age_range,
        gender: row.gender,
        location: row.location,
        submission_timestamp: row.submission_timestamp,
        own_word_count: row.own_word_count,
        referrals_count: referrals.length,
        avg_referral_word_count: avg_word_count,
        is_seed: row.referrer_code === 'Organico',
      },
    });

    if (row.referrer_code === 'Organico') hasOrganic = true;
  }

  if (hasOrganic) {
    nodes.push({
      data: {
        id: 'ORGANIC_ROOT',
        label: 'Orgánico',
        is_root: true,
      },
    });
  }

  // Build directed edges: referrer -> referred
  const edges = [];
  for (const row of docs) {
    if (row.referrer_code === 'Organico') {
      edges.push({
        data: {
          id: `e_organic_${row.doc_id}`,
          source: 'ORGANIC_ROOT',
          target: row.doc_id,
          type: 'organic',
        },
      });
      continue;
    }
    const referrer = byAmbassador.get(row.referrer_code);
    if (referrer) {
      edges.push({
        data: {
          id: `e_${referrer.doc_id}_${row.doc_id}`,
          source: referrer.doc_id,
          target: row.doc_id,
          type: 'referral',
        },
      });
    } else {
      // Dangling code — referrer not (yet) in dataset. Keep as orphan edge with synthetic source.
      edges.push({
        data: {
          id: `e_unknown_${row.doc_id}`,
          source: `UNKNOWN_${row.referrer_code}`,
          target: row.doc_id,
          type: 'unknown_referrer',
          referrer_code: row.referrer_code,
        },
      });
    }
  }

  // Add nodes for unknown referrers found above
  const knownIds = new Set(nodes.map((n) => n.data.id));
  for (const e of edges) {
    if (!knownIds.has(e.data.source)) {
      nodes.push({
        data: {
          id: e.data.source,
          label: e.data.source,
          is_unknown: true,
        },
      });
      knownIds.add(e.data.source);
    }
  }

  const output = {
    metadata: {
      generated_at: new Date().toISOString(),
      project_id: projectId,
      collection: values.collection,
      response_count: docs.length,
      node_count: nodes.length,
      edge_count: edges.length,
    },
    elements: { nodes, edges },
  };

  writeFileSync(resolve(values.out), JSON.stringify(output, null, 2));
  console.error(`Wrote ${nodes.length} nodes, ${edges.length} edges to ${values.out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
