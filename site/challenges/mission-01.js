import { matchesAnswer } from '../core/normalize.js';
import { createMissionShell } from '../components/mission-shell.js';


/* ================================================================
   MISSÃO 01 — AUDITORIA DO INVENTÁRIO
================================================================ */

export const MISSION_01_ACCEPTED = Object.freeze([
  'experiências',
  'experiencias',
]);


export function mountMission01(host, context) {
  const mission = context.mission;
  const view = createMissionShell({ mission, ...context });

  let attempts = 0;


  /* ==============================================================
     CONTEÚDO
  ============================================================== */

  view.content.innerHTML = `
    <div class="mission-01">


      <!-- ==========================================================
           INTRODUÇÃO
      =========================================================== -->

      <section class="mission-section" data-intro>

        <p>
          Uma auditoria encontrou <strong>sete registros anônimos</strong>
          pertencentes à mesma categoria.
        </p>

        <p>
          Os nomes originais foram removidos. Restaram apenas algumas
          propriedades técnicas de cada registro.
        </p>

        <p>
          Seu objetivo é descobrir
          <strong>o que esses sete registros representam</strong>.
        </p>

        <button
          class="button primary"
          type="button"
          data-start
        >
          Iniciar auditoria
        </button>

      </section>


      <!-- ==========================================================
           DESAFIO
      =========================================================== -->

      <section
        class="mission-section"
        data-audit
        hidden
      >


        <!-- ========================================================
             INSTRUÇÕES
        ========================================================= -->

        <div class="audit-instructions">

          <h3>Como realizar a auditoria</h3>

          <p>
            Os sete registros pertencem à
            <strong>mesma classificação</strong>.
          </p>

          <p>
            Nem todos os campos estão disponíveis em todos os registros.
            Por isso, você deve analisar o
            <strong>conjunto completo de evidências</strong>.
          </p>

          <ol>
            <li>
              Leia os atributos encontrados nos sete registros.
            </li>

            <li>
              Compare essas evidências com as categorias candidatas.
            </li>

            <li>
              Quando uma categoria entrar em conflito com
              <strong>pelo menos uma evidência</strong>,
              marque o checkbox para eliminá-la.
            </li>

            <li>
              Continue eliminando possibilidades até restar a categoria
              que consegue explicar o conjunto inteiro.
            </li>

            <li>
              Digite essa classificação no campo de resposta.
            </li>
          </ol>

          <p class="audit-note">
            <strong>Importante:</strong>
            os checkboxes representam categorias que você decidiu
            <strong>descartar</strong>, e não categorias que considera corretas.
          </p>

        </div>


        <!-- ========================================================
             REGISTROS
        ========================================================= -->

        <h3>1. Registros encontrados</h3>

        <p>
          Os registros foram anonimizados. Alguns campos aparecem como
          <strong>—</strong> porque aquela informação não estava disponível
          naquele registro.
        </p>

        <div class="table-wrap">

          <table class="data-table mission-01-records">

            <thead>
              <tr>
                <th>Registro</th>
                <th>Massa</th>
                <th>Copiável</th>
                <th>Quando ocorre</th>
                <th>Presença</th>
                <th>Depois do uso</th>
                <th>Resultado</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td><strong>R1</strong></td>
                <td>0</td>
                <td>Não</td>
                <td>Futuro</td>
                <td>Necessária</td>
                <td>Encerrado</td>
                <td>—</td>
              </tr>

              <tr>
                <td><strong>R2</strong></td>
                <td>0</td>
                <td>Não</td>
                <td>Futuro</td>
                <td>Necessária</td>
                <td>—</td>
                <td>Memória</td>
              </tr>

              <tr>
                <td><strong>R3</strong></td>
                <td>0</td>
                <td>—</td>
                <td>Horário reservado</td>
                <td>Necessária</td>
                <td>Encerrado</td>
                <td>—</td>
              </tr>

              <tr>
                <td><strong>R4</strong></td>
                <td>0</td>
                <td>Não</td>
                <td>Data específica</td>
                <td>—</td>
                <td>Encerrado</td>
                <td>Memória</td>
              </tr>

              <tr>
                <td><strong>R5</strong></td>
                <td>0</td>
                <td>—</td>
                <td>Futuro</td>
                <td>Necessária</td>
                <td>—</td>
                <td>Memória</td>
              </tr>

              <tr>
                <td><strong>R6</strong></td>
                <td>0</td>
                <td>Não</td>
                <td>Data específica</td>
                <td>Necessária</td>
                <td>—</td>
                <td>—</td>
              </tr>

              <tr>
                <td><strong>R7</strong></td>
                <td>0</td>
                <td>Não</td>
                <td>Futuro</td>
                <td>Necessária</td>
                <td>Encerrado</td>
                <td>Memória</td>
              </tr>

            </tbody>

          </table>

        </div>


        <!-- ========================================================
             RESUMO DAS EVIDÊNCIAS


        <div class="audit-evidence-summary">

          <h3>O que a auditoria já permite concluir?</h3>

          <p>
            Considerando os sete registros em conjunto:
          </p>

          <ul>
            <li>
              nenhum deles possui massa física;
            </li>

            <li>
              aquilo que é utilizado não pode simplesmente ser copiado;
            </li>

            <li>
              existe uma data ou um momento futuro para sua ocorrência;
            </li>

            <li>
              a participação da pessoa é necessária;
            </li>

            <li>
              depois que ocorre, aquela unidade é considerada encerrada;
            </li>

            <li>
              o que pode permanecer depois é uma memória.
            </li>
          </ul>

        </div>
        ========================================================= -->


        <!-- ========================================================
             ELIMINAÇÃO
        ========================================================= -->

        <h3>2. Elimine as categorias incompatíveis</h3>

        <p>
          Agora compare as evidências acima com cada possibilidade.
        </p>

        <p>
          <strong>
            Marque uma categoria quando conseguir encontrar pelo menos
            uma evidência que prove que os registros não podem pertencer a ela.
          </strong>
        </p>


        <div class="elimination-list" data-elimination-list>


          <!-- OBJETO -->

          <label class="elimination-option">

            <input
              type="checkbox"
              name="elimination"
              value="objeto"
            />

            <span class="elimination-content">

              <span class="elimination-title">
                <b>Objeto</b>
              </span>

              <span class="elimination-rule">
                É algo físico e permanece existindo materialmente depois
                de adquirido ou utilizado.
              </span>

            </span>

          </label>

          <br>
          <!-- INFORMAÇÃO -->

          <label class="elimination-option">

            <input
              type="checkbox"
              name="elimination"
              value="informacao"
            />

            <span class="elimination-content">

              <span class="elimination-title">
                <b>Informação</b>
              </span>

              <span class="elimination-rule">
                Pode ser reproduzida ou copiada sem que o conteúdo original
                deixe de existir.
              </span>

            </span>

          </label>

          <br>
          <!-- ARQUIVO DIGITAL -->

          <label class="elimination-option">

            <input
              type="checkbox"
              name="elimination"
              value="arquivo-digital"
            />

            <span class="elimination-content">

              <span class="elimination-title">
                <b>Arquivo ou produto digital</b>
              </span>

              <span class="elimination-rule">
                Pode ser armazenado, duplicado e normalmente continua
                disponível depois de ser utilizado.
              </span>

            </span>

          </label>

          <br>
          <!-- SERVIÇO DIGITAL -->

          <label class="elimination-option">

            <input
              type="checkbox"
              name="elimination"
              value="servico-digital"
            />

            <span class="elimination-content">

              <span class="elimination-title">
                <b>Serviço digital</b>
              </span>

              <span class="elimination-rule">
                Pode ser realizado remotamente e não depende da presença
                física da pessoa em um local determinado.
              </span>

            </span>

          </label>

          <br>
          <!-- ASSINATURA -->

          <label class="elimination-option">

            <input
              type="checkbox"
              name="elimination"
              value="assinatura"
            />

            <span class="elimination-content">

              <span class="elimination-title">
                <b>Assinatura</b>
              </span>

              <span class="elimination-rule">
                Concede acesso durante determinado período e normalmente
                pode ser utilizada várias vezes enquanto permanecer válida.
              </span>

            </span>

          </label>

          <br>
          <!-- EXPERIÊNCIA -->

          <label class="elimination-option">

            <input
              type="checkbox"
              name="elimination"
              value="experiencia"
            />

            <span class="elimination-content">

              <span class="elimination-title">
                <b>Experiência</b>
              </span>

              <span class="elimination-rule">
                Existe enquanto está sendo vivida e depende da participação
                da pessoa durante sua ocorrência.
              </span>

            </span>

          </label>

                    <br>
          <!-- CRÉDITO -->

          <label class="elimination-option">

            <input
              type="checkbox"
              name="elimination"
              value="credito"
            />

            <span class="elimination-content">

              <span class="elimination-title">
                <b>Crédito ou saldo</b>
              </span>

              <span class="elimination-rule">
                Representa um valor armazenado que pode ser consumido,
                dividido ou utilizado em uma transação.
              </span>

            </span>

          </label>

          <br>
          <!-- AGENDAMENTO -->

          <label class="elimination-option">

            <input
              type="checkbox"
              name="elimination"
              value="agendamento"
            />

            <span class="elimination-content">

              <span class="elimination-title">
                <b>Agendamento</b>
              </span>

              <span class="elimination-rule">
                É apenas o registro de que alguma atividade está marcada
                para determinada data ou horário.
              </span>

            </span>

          </label>

        </div>


        <!-- ========================================================
             CONTADOR DE ELIMINAÇÕES
        ========================================================= -->

        <div
          class="elimination-status"
          data-elimination-status
          aria-live="polite"
        >
          Nenhuma categoria eliminada ainda.
        </div>


        <!-- ========================================================
             PERGUNTA FINAL
        ========================================================= -->

        <div class="final-classification">

          <h3>3. Classificação final</h3>

          <p>
            Depois de eliminar as categorias incompatíveis, observe
            qual possibilidade consegue explicar
            <strong>todas as evidências ao mesmo tempo</strong>.
          </p>

          <form
            class="answer-form"
            data-form
          >

            <label for="mission-01-answer">
              A que categoria pertencem os sete registros?
            </label>

            <input
              id="mission-01-answer"
              name="answer"
              autocomplete="off"
              placeholder="Digite a classificação"
              required
            />

            <button
              class="button primary"
              type="submit"
            >
              Registrar classificação
            </button>

          </form>

        </div>


        <!-- ========================================================
             AJUDA PROGRESSIVA
        ========================================================= -->

        <div
          class="mission-hint"
          data-help
          role="status"
          aria-live="polite"
          hidden
        ></div>


        <!-- ========================================================
             BÔNUS
        ========================================================= -->

        <section
          class="mission-bonus"
          data-bonus
          hidden
        >

          <h3>Memória desbloqueado</h3>

          <p>
            <strong>Quando tudo começou - Agosto de 2022.</strong>
          </p>

          <p>
            Um encontro em uma festa de amigos no
            <strong>Alto da Boa Vista</strong>.
          </p>

          <p>
            Algumas coisas não permanecem porque podem ser guardadas
            em uma caixa, copiadas para um arquivo ou mantidas em uma conta.
          </p>

          <p>
            Permanecem porque foram vividas.
          </p>

        </section>


      </section>

    </div>
  `;


  /* ==============================================================
     REFERÊNCIAS
  ============================================================== */

  const intro =
    view.content.querySelector('[data-intro]');

  const audit =
    view.content.querySelector('[data-audit]');

  const startButton =
    view.content.querySelector('[data-start]');

  const form =
    view.content.querySelector('[data-form]');

  const answerInput =
    view.content.querySelector('#mission-01-answer');

  const help =
    view.content.querySelector('[data-help]');

  const bonus =
    view.content.querySelector('[data-bonus]');

  const eliminationList =
    view.content.querySelector('[data-elimination-list]');

  const eliminationStatus =
    view.content.querySelector('[data-elimination-status]');


  /* ==============================================================
     INICIAR AUDITORIA
  ============================================================== */

  startButton.addEventListener('click', () => {

    intro.hidden = true;
    audit.hidden = false;

    const firstCheckbox =
      eliminationList.querySelector('input[type="checkbox"]');

    requestAnimationFrame(() => {
      firstCheckbox?.focus();
    });

  });


  /* ==============================================================
     CHECKBOXES DE ELIMINAÇÃO
  ============================================================== */

  function updateEliminationStatus() {

    const checkboxes = [
      ...eliminationList.querySelectorAll(
        'input[type="checkbox"]',
      ),
    ];

    const eliminated =
      checkboxes.filter((checkbox) => checkbox.checked);

    /*
     * Atualiza visualmente cada opção eliminada.
     */
    checkboxes.forEach((checkbox) => {

      const option =
        checkbox.closest('.elimination-option');

      option?.classList.toggle(
        'is-eliminated',
        checkbox.checked,
      );

    });


    /*
     * Nenhuma eliminada.
     */
    if (eliminated.length === 0) {

      eliminationStatus.textContent =
        'Nenhuma categoria eliminada ainda.';

      return;
    }


    /*
     * Uma eliminada.
     */
    if (eliminated.length === 1) {

      eliminationStatus.textContent =
        '1 categoria eliminada. Continue comparando as evidências.';

      return;
    }


    /*
     * Ainda existem pelo menos duas possibilidades.
     */
    if (eliminated.length < 7) {

      const remaining =
        checkboxes.length - eliminated.length;

      eliminationStatus.textContent =
        `${eliminated.length} categorias eliminadas. ` +
        `${remaining} possibilidades ainda não foram descartadas.`;

      return;
    }


    /*
     * Apenas uma categoria não eliminada.
     *
     * Não mostramos o nome dela aqui para não entregar a resposta.
     */
    if (eliminated.length === 7) {

      eliminationStatus.textContent =
        'Você deixou apenas uma categoria sem eliminar. ' +
        'Confira se ela realmente explica todas as evidências ' +
        'e registre sua classificação abaixo.';

      return;
    }


    /*
     * Todas eliminadas.
     */
    eliminationStatus.textContent =
      'Você eliminou todas as categorias. ' +
      'Revise sua análise: pelo menos uma delas precisa sobreviver.';

  }


  eliminationList.addEventListener('change', (event) => {

    if (
      !event.target.matches(
        'input[type="checkbox"]',
      )
    ) {
      return;
    }

    updateEliminationStatus();

  });


  /* ==============================================================
     AJUDA PROGRESSIVA
  ============================================================== */

  function updateHelp() {

    /*
     * 1º e 2º erro:
     * apenas erro neutro.
     */

    if (attempts < 3) {

      help.hidden = true;
      help.innerHTML = '';

      return;

    }


    /*
     * 3º ao 6º erro:
     * explicar melhor o MÉTODO.
     */

    if (attempts < 7) {

      help.hidden = false;

      help.innerHTML = `
        <p>
          <strong>Dica:</strong>
          não tente adivinhar diretamente a resposta.
        </p>

        <p>
          Escolha uma categoria de cada vez e procure na tabela
          uma propriedade que entre em conflito com a definição dela.
          Se encontrar uma contradição, elimine essa categoria.
        </p>
      `;

      return;

    }


    /*
     * 7º ao 11º erro:
     * dica mais direcionada.
     */

    if (attempts < 12) {

      help.hidden = false;

      help.innerHTML = `
        <p>
          <strong>Dica:</strong>
          concentre-se principalmente em quatro evidências:
        </p>

        <ul>
          <li>a participação da pessoa é necessária;</li>
          <li>há um momento específico para a ocorrência;</li>
          <li>a unidade termina depois de utilizada;</li>
          <li>o que permanece é uma memória.</li>
        </ul>

        <p>
          Pergunte-se qual categoria descreve algo que precisa ser
          <strong>vivido</strong>, em vez de simplesmente possuído,
          armazenado ou acessado.
        </p>
      `;

      return;

    }


    /*
     * 12º erro:
     * nenhuma nova dica automática.
     */

    help.hidden = false;

    help.innerHTML = `
      <p>
        As dicas automáticas terminaram.
      </p>

      <button
        class="button secondary"
        type="button"
        data-call-creator
      >
        Recorrer ao criador
      </button>
    `;


    const creatorButton =
      help.querySelector('[data-call-creator]');


    creatorButton.addEventListener('click', () => {

      view.content.dispatchEvent(
        new CustomEvent(
          'mission:request-creator',
          {
            bubbles: true,

            detail: {
              missionId: mission.id,
            },
          },
        ),
      );

    });

  }


  /* ==============================================================
     VALIDAÇÃO DA RESPOSTA
  ============================================================== */

  form.addEventListener('submit', (event) => {

    event.preventDefault();

    if (view.blocked) {
      return;
    }


    const answer =
      event.currentTarget.answer.value;


    /* ------------------------------------------------------------
       RESPOSTA CORRETA
    ------------------------------------------------------------- */

    if (
      matchesAnswer(
        answer,
        MISSION_01_ACCEPTED,
      )
    ) {

      help.hidden = true;
      bonus.hidden = false;

      answerInput.disabled = true;

      const submitButton =
        form.querySelector(
          'button[type="submit"]',
        );

      submitButton.disabled = true;


      view.success(
        'Auditoria concluída. Os registros não representam algo que ' +
        'possa ser guardado, copiado ou reutilizado: representam ' +
        'experiências que foram e que ainda serão vividas.',
      );

      return;

    }


    /* ------------------------------------------------------------
       RESPOSTA INCORRETA
    ------------------------------------------------------------- */

    attempts += 1;


    view.fail(
      'Essa classificação entra em conflito com pelo menos uma ' +
      'das evidências do inventário. Revise as categorias eliminadas.',
    );


    updateHelp();


    answerInput.select();

  });


  /* ==============================================================
     MONTAGEM
  ============================================================== */

  host.replaceChildren(view.root);

}