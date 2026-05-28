'use client';

import { useEffect } from 'react';

type ErrorPayload = {
  kind: 'error' | 'unhandledrejection';
  message: string;
  source?: string;
  line?: number;
  column?: number;
  stack?: string;
  url: string;
  timestamp: string;
};

const STORAGE_KEY = 'fraternitas_client_errors';
const MAX_STORED_ERRORS = 30;

function persistError(payload: ErrorPayload) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as ErrorPayload[]) : [];
    const next = [...parsed.slice(-MAX_STORED_ERRORS + 1), payload];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage issues to avoid cascading failures.
  }
}

export default function ClientErrorObserver() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      const payload: ErrorPayload = {
        kind: 'error',
        message: event.message || 'Unknown client error',
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      };

      console.error('[FraternitasQ] Client runtime error', payload);
      persistError(payload);
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const payload: ErrorPayload = {
        kind: 'unhandledrejection',
        message:
          reason instanceof Error
            ? reason.message
            : typeof reason === 'string'
              ? reason
              : 'Unhandled promise rejection',
        stack: reason instanceof Error ? reason.stack : undefined,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      };

      console.error('[FraternitasQ] Unhandled promise rejection', payload);
      persistError(payload);
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, []);

  return null;
}
