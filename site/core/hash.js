export async function sha256(value) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Web Crypto não está disponível neste ambiente.');
  }
  const bytes = new TextEncoder().encode(String(value));
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function matchesHash(value, expectedHash) {
  return (await sha256(value)) === expectedHash;
}
