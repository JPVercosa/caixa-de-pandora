import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeText, matchesAnswer } from '../site/core/normalize.js';
import { sha256 } from '../site/core/hash.js';
import { authenticate } from '../site/core/auth.js';
import { isReleased } from '../site/core/release.js';
import { createAttemptController } from '../site/core/attempts.js';
import { createStateStore } from '../site/core/state.js';
import { formatDate } from '../site/components/hub.js';

class MemoryStorage {
  #data = new Map();
  get length() { return this.#data.size; }
  key(index) { return [...this.#data.keys()][index] ?? null; }
  getItem(key) { return this.#data.get(key) ?? null; }
  setItem(key, value) { this.#data.set(String(key), String(value)); }
  removeItem(key) { this.#data.delete(key); }
}

test('normaliza acentos, caixa e separadores', () => {
  assert.equal(normalizeText('  Açaí!  '), 'ACAI');
  assert.equal(normalizeText('Boîte aux lettres'), 'BOITEAUXLETTRES');
  assert.equal(matchesAnswer(' Jóia ', ['joia']), true);
  assert.equal(matchesAnswer('filme', ['cinema']), false);
});

test('calcula o hash da senha de acesso', async () => {
  assert.equal(await sha256('bububu'), 'd404ea81c0e610961ae9ee0419a3e4ed5717f2f5a17729cdda1c724e713c93c7');
});

test('autentica a senha correta e rejeita a incorreta', async () => {
  const storage = new MemoryStorage();
  const hash = 'd404ea81c0e610961ae9ee0419a3e4ed5717f2f5a17729cdda1c724e713c93c7';
  assert.equal(await authenticate('errada', hash, storage), false);
  assert.equal(storage.getItem('pandora.authenticated'), null);
  assert.equal(await authenticate('bububu', hash, storage), true);
  assert.equal(storage.getItem('pandora.authenticated'), 'true');
});

test('libera missão somente no instante configurado', () => {
  const unlock = '2026-09-03T00:00:00+02:00';
  assert.equal(isReleased(unlock, new Date('2026-09-02T18:59:59-03:00')), false);
  assert.equal(isReleased(unlock, new Date('2026-09-02T19:00:00-03:00')), true);
});

test('exibe datas no fuso canônico de Paris', () => {
  assert.equal(formatDate('2026-09-01T00:00:00+02:00', 'Europe/Paris'), '01/09');
});

test('controla dicas em 3 e 7 erros e contato em 12', () => {
  const hints = []; let contacts = 0;
  const controller = createAttemptController({ hints: ['método', 'forte'], onHint: (hint) => hints.push(hint), onContact: () => { contacts += 1; } });
  for (let i = 0; i < 12; i += 1) controller.wrong();
  assert.deepEqual(hints, ['método', 'forte']);
  assert.equal(contacts, 1);
  assert.equal(controller.count, 12);
});

test('persiste e reseta estado de missão', () => {
  const storage = new MemoryStorage(); const state = createStateStore(storage);
  state.write(1, { completed: true });
  assert.deepEqual(state.read(1), { completed: true });
  state.reset();
  assert.deepEqual(state.read(1), {});
});
