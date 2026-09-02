import test from 'node:test';
import assert from 'node:assert/strict';
import { MISSIONS } from '../site/challenges/registry.js';
import { MISSION_01_ACCEPTED } from '../site/challenges/mission-01.js';
import { MISSION_03_PANELS } from '../site/challenges/mission-03.js';
import { MISSION_05_PANELS } from '../site/challenges/mission-05.js';
import { normalizeText } from '../site/core/normalize.js';

test('registro inicial implementa somente as três primeiras missões', () => {
  assert.deepEqual(MISSIONS.filter((mission) => mission.implemented).map((mission) => mission.id), [1, 3, 5]);
  assert.equal(MISSIONS.filter((mission) => !mission.implemented).length, 8);
});

test('missão 01 aceita a classificação canônica', () => {
  assert.equal(MISSION_01_ACCEPTED.some((answer) => normalizeText(answer) === 'EXPERIENCIAS'), true);
});

test('missão 03 possui quatro painéis com iniciais VALE', () => {
  assert.equal(MISSION_03_PANELS.length, 4);
  assert.equal(MISSION_03_PANELS.map((panel) => panel.letter).sort().join(''), 'AELV');
  assert.equal(MISSION_03_PANELS.every((panel) => panel.options.includes(panel.answer)), true);
});

test('missão 05 possui extração ACAI e quatro bancos fechados', () => {
  assert.equal(MISSION_05_PANELS.length, 4);
  assert.equal(MISSION_05_PANELS.map((panel) => panel.extracted).join(''), 'ACAI');
  assert.equal(MISSION_05_PANELS.every((panel) => panel.candidates.includes(panel.answer)), true);
  assert.deepEqual(MISSION_05_PANELS.map((panel) => panel.index), [6, 1, 3, 3]);
});
