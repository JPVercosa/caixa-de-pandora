import { matchesAnswer } from '../core/normalize.js';
import { createMissionShell } from '../components/mission-shell.js';

export const MISSION_05_PANELS = Object.freeze([
  { lang: 'PT', candidates: ['TIGELA', 'PANELA', 'CANELA', 'JANELA', 'TUTELA'], rows: ['PANELA · ⬛⬛⬛🟩🟩🟩', 'TUTELA · 🟩⬛⬛🟩🟩🟩'], answer: 'TIGELA', index: 6, extracted: 'A' },
  { lang: 'EN', candidates: ['CREAM', 'DREAM', 'BREAK', 'CLEAR', 'GREAT'], rows: ['DREAM · ⬛🟩🟩🟩🟩', 'CLEAR · 🟩⬛🟩🟩🟨'], answer: 'CREAM', index: 1, extracted: 'C' },
  { lang: 'FR', candidates: ['FRAISE', 'BRAISE', 'FRANGE', 'FRAUDE', 'FRISEE'], rows: ['BRAISE · ⬛🟩🟩🟩🟩🟩', 'FRANGE · 🟩🟩🟩⬛⬛🟩'], answer: 'FRAISE', index: 3, extracted: 'A' },
  { lang: 'ES', candidates: ['FRÍO', 'FRÍA', 'TRÍO', 'CRÍO', 'BRÍO'], rows: ['TRÍO · ⬛🟩🟩🟩', 'FARO · 🟩⬛🟨🟩'], answer: 'FRÍO', index: 3, extracted: 'Í' }
]);

export function mountMission05(host, context) {
  const view = createMissionShell({ mission: context.mission, ...context });
  view.content.innerHTML = `
    <p>Em cada painel, compare as duas tentativas com o banco fechado de candidatas. 🟩 está na posição, 🟨 existe em outra posição e ⬛ não participa.</p>
    <div class="word-grid">${MISSION_05_PANELS.map((panel, index) => `<fieldset class="word-panel"><legend>${panel.lang}</legend><div class="feedback-rows">${panel.rows.map((row) => `<code>${row}</code>`).join('')}</div><label for="word-${index}">Palavra compatível</label><select id="word-${index}" data-word="${index}"><option value="">Selecionar</option>${panel.candidates.map((candidate) => `<option value="${candidate}">${candidate}</option>`).join('')}</select></fieldset>`).join('')}</div>
    <button class="button secondary" data-extract type="button">Conferir quatro grades</button>
    <div class="extraction" data-extraction hidden><p>Índices revelados: <strong>6 · 1 · 3 · 3</strong></p><p class="extraction-code">A · C · A · Í</p><form class="answer-form" data-form><label for="mission-05-answer">Qual palavra portuguesa foi extraída?</label><input id="mission-05-answer" name="answer" autocomplete="off" required /><button class="button primary" type="submit">Validar palavra</button></form></div>`;
  view.content.querySelector('[data-extract]').addEventListener('click', () => {
    if (view.blocked) return;
    const valid = MISSION_05_PANELS.every((panel, index) => view.content.querySelector(`[data-word="${index}"]`).value === panel.answer);
    if (!valid) { view.fail('Uma das grades ainda não está consistente com os dois padrões.'); return; }
    view.content.querySelector('[data-extraction]').hidden = false;
    view.content.querySelector('[data-extract]').hidden = true;
    view.content.querySelector('#mission-05-answer').focus();
  });
  view.content.querySelector('[data-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    if (matchesAnswer(event.currentTarget.answer.value, ['açaí', 'acai'])) view.success('Primeira entrega desbloqueada: uma experiência gelada para ser escolhida no futuro.');
    else view.fail('A extração foi montada, mas a palavra final não confere.');
  });
  host.replaceChildren(view.root);
}
