import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Brain,
  Network,
  MessagesSquare,
  Users,
  Sparkles,
  ScrollText,
  Target,
  CheckCircle2,
  Heart,
  Scale,
  Cpu,
} from "lucide-react";

const QUESTIONNAIRE_PATH = "/questionnaire/202605_fraternitas";

const dimensions = [
  {
    icon: Heart,
    label: "Experiencia Vivida",
    stimulus:
      "Relata una situación donde sentiste que la fraternidad fue real y necesaria. ¿Quiénes estaban y qué ocurrió?",
    objective:
      "Capturar la solidaridad orgánica e identificar si el vínculo es de auxilio, ritual o afecto.",
    refs: "Durkheim · Mauss · Kathya Araujo",
  },
  {
    icon: Scale,
    label: "Límites y Tensiones",
    stimulus:
      "¿En qué momento la fraternidad choca con lo que es justo o legal? Danos un ejemplo.",
    objective:
      "Identificar los Cruxes —puntos de quiebre ético— donde el consenso se rompe.",
    refs: "Weber · Simmel · Daniel Mansuy",
  },
  {
    icon: Cpu,
    label: "Futuro y Tecnología",
    stimulus:
      "En un mundo de vínculos virtuales y relaciones entre personas y computadoras, ¿es posible la fraternidad sin presencia física? ¿Cómo se vería?",
    objective:
      "Explorar la acción comunicativa y el uso del lenguaje simbólico vs. funcional.",
    refs: "Habermas · Bauman · Martín Hopenhayn",
  },
];

const objectives = [
  "Recopilar narrativas densas mediante una plataforma digital de interfaz multimodal (Texto / Voz a Texto).",
  "Procesar el discurso mediante modelos LLM para la extracción de claims atómicos relativos al vínculo social.",
  "Visualizar la topología conceptual a través de grafos de conocimiento que sistematicen afinidades y disensos.",
  "Contrastar las variaciones semánticas del concepto entre comunidades específicas (Masónica, Confesional y Civil).",
];

const phases = [
  { phase: "I", title: "Infraestructura", duration: "Semanas 1–2", detail: "Configuración de Supabase, API FastAPI e interfaz Web." },
  { phase: "II", title: "Recolección", duration: "Semanas 3–6", detail: "Despliegue de la web y campaña de captura de respuestas." },
  { phase: "III", title: "Procesamiento", duration: "Semana 7", detail: "Ejecución del pipeline de T3C y limpieza de datos." },
  { phase: "IV", title: "Análisis", duration: "Semanas 8–10", detail: "Interpretación sociológica del grafo y redacción de resultados." },
];

const results = [
  {
    title: "Cartografía Semántica Interactiva",
    detail: "Reporte digital con el grafo de conocimiento de la Fraternidad.",
  },
  {
    title: "Paper de Investigación",
    detail: "Informe técnico sobre los hallazgos sociológicos y la efectividad del modelo LLM.",
  },
  {
    title: "Dataset Vectorial",
    detail: "Base de datos estructurada para futuros estudios sobre gobernanza distribuida y Adaptive Orchestration.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs">
              FQ
            </div>
            <span>FraternitasQ</span>
          </div>
          <Link href={QUESTIONNAIRE_PATH}>
            <Button size="sm">
              Participar <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge variant="secondary" className="mx-auto">
            Investigación Corporación Aurora de Italia · Metodología Talk to the City
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            Dimensiones Latentes de la{" "}
            <span className="text-primary">Fraternidad</span> en el Chile
            Contemporáneo
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Un estudio de Sociología Computacional mediante el Procesamiento de
            Lenguaje Natural (LLM) y Grafos de Conocimiento.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link href={QUESTIONNAIRE_PATH}>
              <Button size="lg" className="w-full sm:w-auto">
                Comenzar Cuestionario <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="#metodologia">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Conocer la Metodología
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <Badge>El Problema</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Una tensión semántica en la modernidad
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A pesar de constituir uno de los pilares axiológicos de la
              modernidad republicana de nuestro país, el concepto de Fraternidad ha sido
              históricamente supeditado a las categorías de Libertad e Igualdad.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              En el escenario actual de hiperconectividad, oscila entre la{" "}
              <strong className="text-slate-900">solidaridad orgánica</strong>,
              el{" "}
              <strong className="text-slate-900">asociacionismo digital</strong>{" "}
              y el{" "}
              <strong className="text-slate-900">ritualismo iniciático</strong>.
              La sociología enfrenta el desafío de capturar esta polifonía a
              gran escala sin sacrificar la profundidad narrativa.
            </p>
          </div>
          <Card className="bg-slate-50 border-dashed">
            <CardContent className="pt-6 space-y-4">
              <ScrollText className="w-8 h-8 text-primary" />
              <p className="italic text-slate-700 leading-relaxed">
                «¿Cómo significan la fraternidad diversos clústeres sociales en
                Chile y qué nodos de consenso emergen como fundamentos para una
                nueva gobernanza social?»
              </p>
              <p className="text-xs text-muted-foreground">
                Pregunta de investigación
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Justificación */}
      <section className="bg-slate-100/60 border-y">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <Badge>Justificación</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Rehabilitar la fraternidad como cohesión social
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Las metodologías cuantitativas tradicionales resultan insuficientes
              para aprehender la riqueza del discurso, mientras que las
              cualitativas carecen de escalabilidad. La plataforma{" "}
              <strong className="text-slate-900">Talk to the City</strong>{" "}
              habilita una innovación metodológica: el uso de modelos LLM (como
              GPT-5.4) para la extracción de aseveraciones (claims), transformando
              discursos desestructurados en grafos que revelan los{" "}
              <strong className="text-slate-900">Cruxes</strong> o puntos de
              inflexión donde el consenso se rompe.
            </p>
          </div>
        </div>
      </section>

      {/* Objetivos */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <Badge>Objetivos</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Identificar puentes y divergencias entre clústeres sociales
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Analizar las representaciones sociales y los constructos
              subyacentes del concepto de Fraternidad mediante un pipeline de
              inteligencia artificial generativa.
            </p>
          </div>
          <ul className="space-y-3">
            {objectives.map((o) => (
              <li key={o} className="flex gap-3 items-start">
                <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-700">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Metodología — Pipeline */}
      <section id="metodologia" className="bg-slate-100/60 border-y">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge>Marco Metodológico</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Talk to the City: del relato al grafo
            </h2>
            <p className="text-muted-foreground">
              Enfoque cualitativo-computacional que transforma discursos
              desestructurados en datos estructurados.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <MessagesSquare className="w-7 h-7 text-primary mb-2" />
                <CardTitle className="text-lg">1. Recolección</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Interfaz web con persistencia en base de datos y soporte para
                metadatos demográficos.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Brain className="w-7 h-7 text-primary mb-2" />
                <CardTitle className="text-lg">2. Extracción LLM</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Pipeline <em>talk-to-the-city-reports</em> atomiza el discurso
                en claims.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Network className="w-7 h-7 text-primary mb-2" />
                <CardTitle className="text-lg">3. Clustering</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Agrupación temática mediante embeddings vectoriales y
                clustering jerárquico.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Sparkles className="w-7 h-7 text-primary mb-2" />
                <CardTitle className="text-lg">4. Análisis</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Identificación de nodos centrales, periferia semántica y zonas
                de silencio.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dimensiones */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge>Diseño Experimental</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Tres dimensiones de estímulo
          </h2>
          <p className="text-muted-foreground">
            Cada relato responde a una pregunta diseñada para capturar una
            dimensión sociológica específica.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {dimensions.map(({ icon: Icon, label, stimulus, objective, refs }) => (
            <Card key={label} className="flex flex-col">
              <CardHeader>
                <Icon className="w-7 h-7 text-primary mb-2" />
                <CardTitle className="text-lg">{label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm flex-1">
                <p className="italic text-slate-700 leading-relaxed">
                  «{stimulus}»
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-slate-900">Objetivo:</strong>{" "}
                  {objective}
                </p>
                <p className="text-xs text-muted-foreground pt-2 border-t">
                  {refs}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Cronograma */}
      <section className="bg-slate-100/60 border-y">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge>Cronograma</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Cuatro fases de ejecución
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {phases.map((p) => (
              <Card key={p.phase}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded font-bold flex items-center justify-center text-sm">
                      {p.phase}
                    </div>
                    <CardTitle className="text-base">{p.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs font-medium text-primary">
                    {p.duration}
                  </p>
                  <p className="text-sm text-muted-foreground">{p.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resultados Esperados */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge>Resultados Esperados</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Productos de la investigación
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {results.map((r) => (
            <Card key={r.title}>
              <CardHeader>
                <CheckCircle2 className="w-7 h-7 text-primary mb-2" />
                <CardTitle className="text-lg">{r.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {r.detail}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <Card className="bg-primary text-primary-foreground border-0 shadow-xl">
          <CardContent className="py-10 sm:py-12 text-center space-y-5">
            <Users className="w-10 h-10 mx-auto opacity-90" />
            <h2 className="text-2xl sm:text-3xl font-bold">
              Tu voz es parte del grafo
            </h2>
            <p className="opacity-90 max-w-xl mx-auto">
              Comparte tu experiencia, tensiones y visión de futuro. Cada relato
              denso aporta directamente a la cartografía semántica del estudio.
            </p>
            <Link href={QUESTIONNAIRE_PATH}>
              <Button size="lg" variant="secondary" className="mt-2">
                Comenzar Cuestionario <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-xs text-muted-foreground text-center">
          Investigación Corporación Aurora de Italia · FraternitasQ ·{" "}
          {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
