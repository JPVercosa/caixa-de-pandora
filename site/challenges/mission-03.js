import { matchesAnswer } from '../core/normalize.js';
import { createMissionShell } from '../components/mission-shell.js';

export const MISSION_03_PANELS = Object.freeze([
  {
    lang: 'PT-BR',
    clue: 'Depressão natural alongada entre elevações.',
    options: ['planície', 'vale', 'cume', 'encosta'],
    answer: 'vale',
    letter: 'V'
  },
  {
    lang: 'FR',
    clue: "Principe d'impartialité qui vise un traitement juste et adapté.",
    options: ['faveur', 'hasard', 'excès', 'équité'],
    answer: 'équité',
    letter: 'E'
  },
  {
    lang: 'ES',
    clue: 'Fidelidad firme hacia una persona, grupo o causa.',
    options: ['lealtad', 'duda', 'ruptura', 'cambio'],
    answer: 'lealtad',
    letter: 'L'
  },
  {
    lang: 'EN',
    clue: 'Formal permission indicating that a proposed action may proceed.',
    options: ['refusal', 'delay', 'approval', 'review'],
    answer: 'approval',
    letter: 'A'
  }
]);

export function mountMission03(host, context) {
  const view = createMissionShell({
    mission: context.mission,
    ...context
  });

  view.content.innerHTML = `
    <p>Responda as perguntas e encontre o segredo.</p>

    <div class="language-grid">
      ${MISSION_03_PANELS.map(
        (panel, index) => `
          <fieldset class="language-panel">
            <legend>
              <span class="language-tag">${panel.lang}</span>
            </legend>

            <p>${panel.clue}</p>

            <label for="panel-${index}">
              Escolha a palavra exata
            </label>

            <select id="panel-${index}" data-panel="${index}">
              <option value="">Selecionar</option>

              ${panel.options
                .map(
                  (option) => `
                    <option value="${option}">
                      ${option}
                    </option>
                  `
                )
                .join('')}
            </select>
          </fieldset>
        `
      ).join('')}
    </div>

    <div class="extraction" data-extraction>
      <div class="extraction-code">
        A extração
      </div>

      <p>
        Quatro línguas deram voz a quatro respostas.<br>
        Do not seek the secret where the words come to an end.<br>
        Cada palabra deja una pista de su origen antes de contar su historia.<br>
        Rassemblez les quatre signes dans l’ordre où ils se sont révélés.
      </p>

      <form class="answer-form" data-form>
        <label for="mission-03-answer">
          Qual código foi extraído?
        </label>

        <input
          id="mission-03-answer"
          name="answer"
          autocomplete="off"
          required
        />

        <button
          class="button primary"
          type="submit"
        >
          Validar código
        </button>
      </form>
    </div>

    <section
      class="mission-bonus"
      data-bonus
      hidden
    >
      <h3>Memória desbloqueada</h3>

      <p>
        <strong>Christine, 16 Rue Leopold Bellan</strong>
      </p>

      <p>
        Ele: Três meses sofrendo procurando um apartamento <br>
        Ela: Faz uma visita e é aceita pelo proprietário
      </p>

      <p>
        O apartamento é grande para os parâmetros de Paris. <br>
        Tem uma localização central e privilegiada. <br>
        O preço do aluguel é justo, cabe no nosso orçamento e a proprietária é simpática.
      </p>

      <p>
        Às vezes as coisas acontecem porque estavam destinadas a acontecer.
      </p>
    </section>
  `;

  const bonus = view.content.querySelector('[data-bonus]');

  const panelSelects = [
    ...view.content.querySelectorAll('[data-panel]')
  ];

  panelSelects.forEach((select) => {
    select.addEventListener('change', () => {
      view.saveData({
        panels: panelSelects.map((item) => item.value)
      });
    });
  });

  (view.saved.stageData?.panels ?? []).forEach(
    (value, index) => {
      const select = view.content.querySelector(
        `[data-panel="${index}"]`
      );

      if (select) {
        select.value = value;
      }
    }
  );

  view.content
    .querySelector('[data-form]')
    .addEventListener('submit', (event) => {
      event.preventDefault();

      if (
        matchesAnswer(
          event.currentTarget.answer.value,
          ['vale']
        )
      ) {
        const successText =
          'O manifesto encontrou o formato comum das entregas.';

        /*
         * Usa o sistema original de sucesso para manter
         * exatamente a mesma aparência/formatação.
         */
        view.success(successText);

        /*
         * Procura no shell o elemento que contém a mensagem
         * criada pelo view.success().
         *
         * Depois, move esse mesmo elemento para imediatamente
         * antes da seção de bônus.
         */
        const successMessage = [
          ...view.root.querySelectorAll('*')
        ].find((element) => {
          const hasExactText =
            element.textContent.trim() === successText;

          const childHasSameText = [
            ...element.children
          ].some(
            (child) =>
              child.textContent.trim() === successText
          );

          return hasExactText && !childHasSameText;
        });

        if (successMessage) {
          bonus.before(successMessage);
        }

        bonus.hidden = false;
      } else {
        view.fail(
          'O código extraído ainda não foi validado.'
        );
      }
    });

  host.replaceChildren(view.root);
}