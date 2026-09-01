import { createAttemptController } from '../core/attempts.js';

export function createMissionShell({ mission, onBack, onComplete, onContact, store }) {
  const root = document.createElement('section');
  root.className = 'mission card';
  root.innerHTML = `
    <div class="mission-nav"><button class="button ghost" data-back type="button">← Inventário</button><span>MISSÃO ${String(mission.id).padStart(2, '0')}</span></div>
    <div class="eyebrow">${mission.kicker}</div>
    <h1>${mission.title}</h1>
    <p class="lead">${mission.subtitle}</p>
    <div class="mission-content"></div>
    <div class="mission-feedback" aria-live="polite">
      <p class="form-message" data-feedback hidden></p>
      <div class="hint-box" data-hint hidden></div>
      <button class="button secondary" data-contact type="button" hidden>Recorrer ao criador</button>
    </div>`;
  const content = root.querySelector('.mission-content');
  const feedback = root.querySelector('[data-feedback]');
  const hint = root.querySelector('[data-hint]');
  const contact = root.querySelector('[data-contact]');
  let blocked = false;
  const attempts = createAttemptController({
    hints: mission.hints,
    onHint(value) {
      hint.textContent = value;
      hint.hidden = false;
    },
    onContact() {
      blocked = true;
      contact.hidden = false;
      feedback.textContent = 'O arquivo não vai facilitar mais. Se quiser, peça ajuda ao criador.';
      feedback.hidden = false;
    }
  });

  root.querySelector('[data-back]').addEventListener('click', onBack);
  contact.addEventListener('click', onContact);

  return {
    root,
    content,
    attempts,
    get blocked() { return blocked; },
    fail(message = 'Ainda não. Reavalie os dados da missão.') {
      if (blocked) return;
      feedback.textContent = message;
      feedback.hidden = false;
      attempts.wrong();
    },
    success(bonus) {
      blocked = true;
      store.write(mission.id, { completed: true, bonusSeen: true });
      feedback.className = 'mission-feedback success';
      feedback.innerHTML = `<p class="success-title">Missão concluída.</p><p>${bonus}</p>`;
      onComplete(mission.id);
    }
  };
}
