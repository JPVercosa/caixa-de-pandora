import { matchesAnswer } from '../core/normalize.js';
import { createMissionShell } from '../components/mission-shell.js';

export const MISSION_03_PANELS = Object.freeze([
  { lang: 'PT-BR', clue: 'Depressão natural alongada entre elevações.', options: ['vale', 'planície', 'cume', 'encosta'], answer: 'vale', letter: 'V' },
  { lang: 'EN', clue: 'Formal permission indicating that a proposed action may proceed.', options: ['approval', 'refusal', 'delay', 'review'], answer: 'approval', letter: 'A' },
  { lang: 'ES', clue: 'Fidelidad firme hacia una persona, grupo o causa.', options: ['lealtad', 'duda', 'ruptura', 'cambio'], answer: 'lealtad', letter: 'L' },
  { lang: 'FR', clue: "Principe d'impartialité qui vise un traitement juste et adapté.", options: ['équité', 'faveur', 'hasard', 'excès'], answer: 'équité', letter: 'E' }
]);

export function mountMission03(host, context) {
  const view = createMissionShell({ mission: context.mission, ...context });
  view.content.innerHTML = `
    <p>Resolva cada definição no idioma original. As opções são fechadas; a primeira letra de cada solução será usada somente no final.</p>
    <div class="language-grid">${MISSION_03_PANELS.map((panel, index) => `<fieldset class="language-panel"><legend><span class="language-tag">${panel.lang}</span></legend><p>${panel.clue}</p><label for="panel-${index}">Escolha a palavra exata</label><select id="panel-${index}" data-panel="${index}"><option value="">Selecionar</option>${panel.options.map((option) => `<option value="${option}">${option}</option>`).join('')}</select></fieldset>`).join('')}</div>
    <button class="button secondary" data-extract type="button">Verificar painéis</button>
    <div class="extraction" data-extraction hidden><p>As iniciais das quatro soluções, na ordem dos idiomas:</p><div class="extraction-code">V · A · L · E</div><form class="answer-form" data-form><label for="mission-03-answer">Qual código foi extraído?</label><input id="mission-03-answer" name="answer" autocomplete="off" required /><button class="button primary" type="submit">Validar código</button></form></div>`;
  view.content.querySelector('[data-extract]').addEventListener('click', () => {
    if (view.blocked) return;
    const valid = MISSION_03_PANELS.every((panel, index) => view.content.querySelector(`[data-panel="${index}"]`).value === panel.answer);
    if (!valid) { view.fail('Ainda há uma definição que não corresponde exatamente ao idioma.'); return; }
    view.content.querySelector('[data-extraction]').hidden = false;
    view.content.querySelector('[data-extract]').hidden = true;
    view.content.querySelector('#mission-03-answer').focus();
  });
  view.content.querySelectorAll('[data-panel]').forEach((select) => {
    select.addEventListener('change', () => view.saveData({ panels: [...view.content.querySelectorAll('[data-panel]')].map((item) => item.value) }));
  });
  (view.saved.stageData?.panels ?? []).forEach((value, index) => {
    const select = view.content.querySelector(`[data-panel="${index}"]`);
    if (select) select.value = value;
  });
  view.content.querySelector('[data-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    if (matchesAnswer(event.currentTarget.answer.value, ['vale'])) view.success('O manifesto encontrou o formato comum das entregas.');
    else view.fail('O código extraído ainda não foi validado.');
  });
  host.replaceChildren(view.root);
}
