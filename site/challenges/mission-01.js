import { matchesAnswer } from '../core/normalize.js';
import { createMissionShell } from '../components/mission-shell.js';

export const MISSION_01_ACCEPTED = Object.freeze(['experiências', 'experiencia']);

export function mountMission01(host, context) {
  const mission = context.mission;
  const view = createMissionShell({ mission, ...context });
  view.content.innerHTML = `
    <p>Sete registros têm massa e volume nulos, ocorrência futura, participação presencial, unidade encerrada após o uso e memória como resultado.</p>
    <div class="table-wrap"><table class="data-table"><thead><tr><th>Classe</th><th>Regra de auditoria</th></tr></thead><tbody>
      <tr><td>Objeto</td><td>Exige massa ou volume físico.</td></tr>
      <tr><td>Informação</td><td>Pode ser copiada e permanece disponível depois de acessada.</td></tr>
      <tr><td>Serviço digital</td><td>Pode ocorrer remotamente, sem participação presencial.</td></tr>
      <tr><td>Experiência</td><td>Exige participação, acontece no tempo e deixa uma memória.</td></tr>
    </tbody></table></div>
    <form class="answer-form" data-form>
      <label for="mission-01-answer">Qual é a classificação do conjunto?</label>
      <input id="mission-01-answer" name="answer" autocomplete="off" placeholder="Digite sua classificação" required />
      <button class="button primary" type="submit">Registrar classificação</button>
    </form>`;
  view.content.querySelector('[data-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    if (view.blocked) return;
    const answer = event.currentTarget.answer.value;
    if (matchesAnswer(answer, MISSION_01_ACCEPTED)) view.success('O conjunto não descreve objetos: ele descreve experiências que ainda serão vividas.');
    else view.fail('Uma das regras ainda não fecha com essa classificação.');
  });
  host.replaceChildren(view.root);
}
