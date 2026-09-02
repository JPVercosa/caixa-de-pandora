export function formatDate(value, timezone) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', timeZone: timezone }).format(new Date(value));
}

export function renderHub(root, { missions, isReleased, timezone, store, assetFor, onOpen, onLogout, onReset, showReset = false }) {
  const completed = new Set(missions.filter((mission) => store.read(mission.id).completed).map((mission) => mission.id));
  root.innerHTML = `
    <section class="hub" aria-labelledby="hub-title">
      <header class="topbar">
        <div>
          <div class="eyebrow">INVENTÁRIO DO FUTURO</div>
          <h1 id="hub-title">Baú de Afetos</h1>
        </div>
        <button class="button ghost" id="logout-button" type="button">Fechar arquivo</button>
      </header>
      <div class="intro card">
        <div>
          <p class="eyebrow">STATUS DA OPERAÇÃO</p>
          <h2>Sete entregas sem estoque físico.</h2>
          <p>As missões aparecem no calendário. Algumas ainda estão seladas; as concluídas deixam uma marca na geladeira.</p>
        </div>
        <div class="progress" aria-label="Progresso das missões">
          <strong>${completed.size}</strong><span>/ ${missions.filter((mission) => 11).length}</span>
        </div>
      </div>
      <div class="fridge" aria-label="Geladeira de missões">
        <div class="fridge-label">IMÃS DOS DESAFIOS</div>
        <div class="magnet-grid">
          ${missions.map((mission) => {
            const released = isReleased(mission.unlockAt);
            const done = completed.has(mission.id);
            const disabled = !released || !mission.implemented;
            const state = done ? 'concluída' : released && mission.implemented ? 'disponível' : 'selada';
            const asset = assetFor(mission.id, done);
            const backgroundStyle = asset.fullBackground ? ` style="background-image: url('${asset.src}')"` : '';
            return `<button class="magnet ${done ? 'done' : ''} ${asset.fullBackground ? 'magnet--full' : ''} ${disabled ? 'locked' : ''}" data-mission="${mission.id}" type="button" ${disabled ? 'disabled' : ''}${backgroundStyle} aria-label="Missão ${String(mission.id).padStart(2, '0')}, ${state}">
              ${asset.fullBackground ? '' : `<img src="${asset.src}" alt="" />`}
              <span class="magnet-number">${String(mission.id).padStart(2, '0')}</span>
              <span class="magnet-status">${done ? '✓' : released && mission.implemented ? 'abrir' : formatDate(mission.unlockAt, timezone)}</span>
            </button>`;
          }).join('')}
        </div>
      </div>
      <div class="hub-footer">
        <p>O arquivo é temporário. O conteúdo das missões futuras permanece fora do painel até a data de liberação.</p>
        ${showReset ? '<button class="button text-button" id="reset-button" type="button">Resetar progresso local</button>' : ''}
      </div>
    </section>`;

  root.querySelectorAll('[data-mission]').forEach((button) => {
    button.addEventListener('click', () => onOpen(Number(button.dataset.mission)));
  });
  root.querySelector('#logout-button').addEventListener('click', onLogout);
  root.querySelector('#reset-button')?.addEventListener('click', onReset);
}
