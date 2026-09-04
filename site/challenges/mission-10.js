import { matchesAnswer } from '../core/normalize.js';
import { createMissionShell } from '../components/mission-shell.js';

export const MISSION_10_SCHEDULE = Object.freeze([
  Object.freeze({ id: 'odyssey', time: '17:10', title: 'The Odyssey', language: 'VO', subtitles: 'Básica', audience: 'Solo' }),
  Object.freeze({ id: 'mare', time: '18:20', title: 'Linha de Maré', language: 'VOSTFR', subtitles: 'Baixa', audience: 'Casal' }),
  Object.freeze({ id: 'red', time: '19:10', title: 'Noite em Vermelho', language: 'VOSTFR', subtitles: 'Média', audience: 'Casal' }),
  Object.freeze({ id: 'obsession', time: '20:40', title: 'Obsession', language: 'VF', subtitles: 'Alta', audience: 'Grupo' }),
  Object.freeze({ id: 'fold', time: '22:15', title: 'Última Dobra', language: 'VOSTFR', subtitles: 'Média', audience: 'Solo' })
]);

export const MISSION_10_SOUNDS = Object.freeze([
  Object.freeze({ id: 1, description: 'Várias vozes sustentando a mesma nota.', options: ['Coro', 'Solo', 'Sopro'], answer: 'Coro', letter: 'C' }),
  Object.freeze({ id: 2, description: 'Um impacto grave único, sem repetição.', options: ['Ritmo', 'Impacto', 'Eco'], answer: 'Impacto', letter: 'I' }),
  Object.freeze({ id: 3, description: 'Casco de madeira, ondas e corda tensionada.', options: ['Navio', 'Trem', 'Vento'], answer: 'Navio', letter: 'N' }),
  Object.freeze({ id: 4, description: 'Uma palma seguida de reverberação longa.', options: ['Ruído', 'Eco', 'Silêncio'], answer: 'Eco', letter: 'E' }),
  Object.freeze({ id: 5, description: 'Cliques regulares em frequência constante.', options: ['Chuva', 'Marcha', 'Metrônomo'], answer: 'Metrônomo', letter: 'M' }),
  Object.freeze({ id: 6, description: 'Plateia batendo palmas.', options: ['Passos', 'Porta', 'Aplauso'], answer: 'Aplauso', letter: 'A' })
]);

export const MISSION_10_TARGET_ID = 'red';
export const MISSION_10_ACCEPTED = Object.freeze(['CINEMA']);

export function validateMission10Session(sessionId, answers = []) {
  const session = MISSION_10_SCHEDULE.find((item) => item.id === sessionId);
  const validSession = session?.id === MISSION_10_TARGET_ID
    && session.language === 'VOSTFR'
    && session.subtitles === 'Média'
    && session.audience === 'Casal';
  const validSounds = MISSION_10_SOUNDS.every((sound, index) => answers[index] === sound.answer);
  return {
    validSession,
    validSounds,
    valid: validSession && validSounds,
    code: MISSION_10_SOUNDS.map((sound) => sound.letter).join('')
  };
}

export function mountMission10(host, context) {
  const view = createMissionShell({ mission: context.mission, ...context });
  const saved = view.saved.stageData ?? {};
  let stage = saved.stage ?? 'intro';
  let sessionId = saved.sessionId ?? '';
  let soundAnswers = Array.isArray(saved.soundAnswers) ? [...saved.soundAnswers] : [];

  view.content.innerHTML = `
    <div class="mission-flow mission-10-flow">
      <div class="mission-actions"><button class="button ghost" type="button" data-reset>Reiniciar missão</button></div>
      <section data-stage="intro" ${stage === 'intro' ? '' : 'hidden'}>
        <p>Uma programação noturna guarda uma sessão e seis camadas de som original.</p>
        <button class="button primary" type="button" data-start>Abrir programação</button>
      </section>
      <section data-stage="schedule" ${stage === 'schedule' ? '' : 'hidden'}>
        <h2>Programação VOSTFR</h2>
        <p>Encontre a sessão que combina idioma, público, legenda e posição na programação.</p>
        <div class="table-wrap"><table class="data-table mission-schedule-table"><caption>Programação fictícia</caption><thead><tr><th>Escolher</th><th>Hora</th><th>Título</th><th>Idioma</th><th>Legenda</th><th>Público</th></tr></thead><tbody>
          ${MISSION_10_SCHEDULE.map((item) => `<tr><td><input type="radio" name="session" value="${item.id}" ${item.id === sessionId ? 'checked' : ''} aria-label="Selecionar ${item.title}"></td><th scope="row">${item.time}</th><td>${item.title}</td><td>${item.language}</td><td>${item.subtitles}</td><td>${item.audience}</td></tr>`).join('')}
        </tbody></table></div>
        <button class="button primary" type="button" data-confirm-session>Confirmar sessão</button>
      </section>
      <section data-stage="sounds" ${stage === 'sounds' ? '' : 'hidden'}>
        <h2>Camadas sonoras</h2>
        <p>Escolha a descrição correta para cada camada. A transcrição é suficiente; o áudio é apenas reforço.</p>
        <div data-sounds>
          ${MISSION_10_SOUNDS.map((sound, index) => `<fieldset data-sound="${index}" ${soundAnswers[index] ? '' : index === soundAnswers.length ? '' : 'hidden'}><legend>Camada ${index + 1}</legend><p>${sound.description}</p><div class="choice-list">${sound.options.map((option) => `<button type="button" class="button ghost" data-sound-option="${option}" data-sound-index="${index}" aria-pressed="${soundAnswers[index] === option ? 'true' : 'false'}">${option}</button>`).join('')}</div><p class="sound-result" data-sound-result>${soundAnswers[index] ? `Resolvida: ${soundAnswers[index]}` : ''}</p></fieldset>`).join('')}
        </div>
      </section>
      <section data-stage="synthesis" ${stage === 'synthesis' ? '' : 'hidden'}>
        <h2>Síntese</h2>
        <p>As seis camadas foram resolvidas. Digite a palavra formada pelas iniciais dos rótulos, na ordem apresentada.</p>
        <div class="extraction-code" data-extraction aria-label="Rótulos resolvidos">${soundAnswers.map((answer) => answer).join(' · ')}</div>
        <p>As iniciais, nesta ordem, formam o código de seis letras.</p>
        <form class="answer-form" data-form><label for="mission-10-answer">Qual código foi formado?</label><input id="mission-10-answer" name="answer" autocomplete="off" required><button class="button primary" type="submit">Validar código</button></form>
      </section>
      <section data-stage="completed" ${stage === 'completed' ? '' : 'hidden'}><h2>Sessão concluída</h2><p>O arquivo registrou a noite certa. Código confirmado: <strong>CINEMA</strong>.</p></section>
      <section class="mission-bonus" data-bonus hidden><h2>Memória desbloqueada</h2><p>Uma noite a dois em VOSTFR, com a legenda na medida certa.</p></section>
    </div>`;

  const stages = [...view.content.querySelectorAll('[data-stage]')];
  const save = () => view.saveData({ stage, sessionId, soundAnswers });
  const showStage = (next) => { stage = next; stages.forEach((element) => { element.hidden = element.dataset.stage !== stage; }); save(); };

  view.content.querySelector('[data-start]').addEventListener('click', () => showStage('schedule'));
  view.content.querySelector('[data-reset]').addEventListener('click', () => {
    context.store.clear(context.mission.id);
    mountMission10(host, context);
  });
  view.content.querySelector('[data-confirm-session]').addEventListener('click', () => {
    if (view.blocked) return;
    sessionId = view.content.querySelector('input[name="session"]:checked')?.value ?? '';
    const selected = MISSION_10_SCHEDULE.find((item) => item.id === sessionId);
    const valid = validateMission10Session(sessionId, []);
    if (!valid.validSession) {
      save();
      view.fail(selected ? 'Essa sessão não reúne todos os critérios.' : 'Escolha uma sessão antes de confirmar.');
      return;
    }
    showStage('sounds');
  });

  view.content.querySelectorAll('[data-sound-option]').forEach((button) => {
    button.addEventListener('click', () => {
      if (view.blocked) return;
      const index = Number(button.dataset.soundIndex);
      const sound = MISSION_10_SOUNDS[index];
      if (button.dataset.soundOption !== sound.answer) {
        view.fail('Essa descrição não corresponde à camada.');
        return;
      }
      soundAnswers[index] = sound.answer;
      view.content.querySelectorAll(`[data-sound-index="${index}"]`).forEach((item) => { item.setAttribute('aria-pressed', item === button ? 'true' : 'false'); item.disabled = true; });
      view.content.querySelector(`[data-sound="${index}"] [data-sound-result]`).textContent = `Resolvida: ${sound.answer}`;
      const next = view.content.querySelector(`[data-sound="${index + 1}"]`);
      if (next) next.hidden = false;
      save();
      if (soundAnswers.length === MISSION_10_SOUNDS.length && soundAnswers.every(Boolean)) showStage('synthesis');
    });
  });

  view.content.querySelector('[data-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    if (view.blocked) return;
    const result = validateMission10Session(sessionId, soundAnswers);
    if (!result.valid || !matchesAnswer(event.currentTarget.answer.value, MISSION_10_ACCEPTED)) {
      view.fail('O código ainda não foi validado.');
      return;
    }
    showStage('completed');
    view.success('A sessão certa revelou a palavra final.');
    view.content.querySelector('[data-bonus]').hidden = false;
  });

  if (view.saved.completed) {
    showStage('completed');
    view.content.querySelector('[data-bonus]').hidden = false;
  }
  host.replaceChildren(view.root);
}
