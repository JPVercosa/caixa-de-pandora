export function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '');
}

export function matchesAnswer(value, accepted) {
  const actual = normalizeText(value);
  return accepted.some((answer) => actual === normalizeText(answer));
}
