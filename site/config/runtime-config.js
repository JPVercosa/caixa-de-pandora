import { CONSTANTS } from './constants.js';

const localConfig = globalThis.__PANDORA_LOCAL__ ?? {};
const query = new URLSearchParams(globalThis.location?.search ?? '');

function parseBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === '') return fallback;
  return ['1', 'true', 'yes', 'sim'].includes(String(value).toLowerCase());
}

function simulatedNow() {
  const value = query.get('date') ?? localConfig.previewDate;
  if (!value) return new Date();
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? new Date() : parsed;
}

export const RUNTIME = Object.freeze({
  ...CONSTANTS,
  now: simulatedNow(),
  preview: parseBoolean(query.get('preview'), parseBoolean(localConfig.preview, false)),
  skipPassword: parseBoolean(query.get('skipPassword'), parseBoolean(localConfig.skipPassword, false)),
  reset: parseBoolean(query.get('reset'), parseBoolean(localConfig.reset, false))
});

export function getRuntimeHelp() {
  return 'Prévia local: npm run dev com PANDORA_PREVIEW_DATE=2026-09-05 e PANDORA_SKIP_PASSWORD=1, ou use ?preview=1&date=2026-09-05&skipPassword=1.';
}
