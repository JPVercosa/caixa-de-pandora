import { matchesHash } from './hash.js';

export function isAuthenticated(storage) {
  return storage.getItem('pandora.authenticated') === 'true';
}

export async function authenticate(password, expectedHash, storage) {
  const valid = await matchesHash(password, expectedHash);
  if (valid) storage.setItem('pandora.authenticated', 'true');
  return valid;
}

export function clearAuthentication(storage) {
  storage.removeItem('pandora.authenticated');
}
