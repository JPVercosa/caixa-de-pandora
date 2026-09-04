import { matchesAnswer } from '../core/normalize.js';
import { createMissionShell } from '../components/mission-shell.js';

/*
 * MISSÃO 05 — TERMO DE 4 LETRAS
 *
 * Palavra-resposta:
 *   AÇAÍ
 *
 * Regras:
 * - 6 tentativas.
 * - Cada tentativa precisa ter exatamente 4 letras.
 * - A palavra precisa existir em WORD_LIST.
 * - 🟩 letra correta na posição correta.
 * - 🟨 letra existente em outra posição.
 * - ⬛ letra que não participa da resposta.
 *
 * IMPORTANTE:
 * - C e Ç são considerados equivalentes.
 * - Acentos também são ignorados na comparação.
 *
 * Exemplos equivalentes:
 *   AÇAÍ
 *   AÇAI
 *   ACAÍ
 *   ACAI
 *
 * Todos são normalizados internamente para:
 *   ACAI
 */

const ANSWERS = Object.freeze([
  'ALHO',
  'IÇAR',
  'CEAR',
  'WIFI'
]);

export const MISSION_05_EXTRACTION_INDICES = Object.freeze([0, 1, 2, 3]);

const FINAL_ANSWER = ['AÇAÍ'];

const WORD_LENGTH = 4;
const MAX_ATTEMPTS = 8;


/*
 * Lista inicial de palavras permitidas.
 *
 * Você pode simplesmente continuar acrescentando palavras aqui.
 *
 * Não é necessário adicionar todas as variações de acento.
 * Por exemplo:
 *
 *   AÇAÍ
 *
 * já será normalizado internamente para ACAI.
 */
export const MISSION_05_WORDS = Object.freeze([
  'ABEC', 'ABRA', 'ABRE', 'ABRI', 'ABRO', 'ACAI', 'AÇAÍ', 'AÇÃO', 'ÁCER', 'ACHA', 'ACHE', 'ACHO',
  'AÇOS', 'ACRE', 'ACTA', 'ACTO', 'ADIA', 'ADIE', 'ADIO', 'ADIR', 'ADRO', 'AFIA', 'AFIE', 'AFIM',
  'AFIO', 'ÁGIL', 'ÁGIO', 'AGIR', 'AGIU', 'AGRO', 'ÁGUA', 'AIAR', 'AIPO', 'ALAR', 'ALBA', 'ALÇA',
  'ALCE', 'ÁLEA', 'ALÉM', 'ALGA', 'ALGO', 'ALHO', 'ALIA', 'ALIE', 'ALIO', 'ALMA', 'ALTA', 'ALTO',
  'ALVA', 'ALVO', 'AMAM', 'AMAR', 'AMAS', 'AMEI', 'AMEM', 'AMOR', 'AMOU', 'ANAL', 'ANÃO', 'ANCA',
  'ANDA', 'ANDE', 'ANDO', 'ANEL', 'ANHO', 'ANIL', 'ANIS', 'ANJO', 'ANOS', 'ANSA', 'ANTA', 'ANTE',
  'ANTI', 'ÂNUS', 'APOR', 'APÓS', 'APTO', 'AQUI', 'ARÃO', 'ARAR', 'ARCA', 'ARCO', 'ARDA', 'ARDE',
  'ARDI', 'ARDO', 'ÁREA', 'ARFA', 'ARFE', 'ARFO', 'ÁRIA', 'ARMA', 'ARME', 'ARMO', 'ARTE', 'ASAS',
  'ASCO', 'ASIR', 'ASNA', 'ASNO', 'ASTA', 'ATAR', 'ATER', 'ATEU', 'ATOA', 'ATOR', 'ATRO', 'ATUE',
  'ATUO', 'AUGE', 'AULA', 'AURA', 'AUSO', 'AUTO', 'AVAL', 'AVES', 'AVIO', 'AVIR', 'AVÓS', 'ÁXIS',
  'AZAR', 'AZIA', 'AZUL',

  'BAÇO', 'BAFA', 'BAFE', 'BAFO', 'BAGA', 'BAGO', 'BAIA', 'BAÍA', 'BAIO', 'BALA', 'BALÉ', 'BANI',
  'BASE', 'BATA', 'BATE', 'BATI', 'BATO', 'BEBA', 'BEBE', 'BEBÊ', 'BEBO', 'BECO', 'BELA', 'BELO',
  'BENS', 'BICA', 'BICO', 'BIFE', 'BISA', 'BLOG', 'BOBA', 'BOBO', 'BOCA', 'BODA', 'BODE', 'BOIA',
  'BOIS', 'BOLA', 'BOLO', 'BONS', 'BOTA', 'BOTE', 'BOTO', 'BRIO', 'BROA', 'BULA', 'BULE', 'BUXO',
  'BYTE',

  'CABE', 'CABO', 'CAÇA', 'CAÇO', 'CADA', 'CAEM', 'CÃES', 'CAFÉ', 'CAIA', 'CAÍA', 'CAIO', 'CAIR',
  'CAIS', 'CAIU', 'CAJU', 'CALA', 'CALE', 'CALO', 'CAMA', 'CANA', 'CANO', 'CAOS', 'CAPA', 'CARA',
  'CARO', 'CASA', 'CATA', 'CATE', 'CATO', 'CAVA', 'CAVE', 'CAVO', 'CEAR', 'CEBO', 'CEDA', 'CEDE',
  'CEDI', 'CEDO', 'CEGA', 'CEGO', 'CEIA', 'CEIO', 'CELA', 'CELE', 'CENA', 'CEPA', 'CERA', 'CÉUS',
  'CEVA', 'CHÃO', 'CHAT', 'CHEF', 'CHIA', 'CHIO', 'CHIP', 'CIMA', 'CINE', 'CITA', 'CITE', 'CITO',
  'CLÃS', 'CLIP', 'COAR', 'COCA', 'COÇA', 'COÇO', 'COLE', 'COLO', 'COMA', 'COME', 'COMI', 'COMO',
  'COPA', 'COPO', 'CORA', 'CORE', 'CORO', 'COTA', 'COTE', 'COTO', 'COVA', 'COVE', 'COVO', 'CRER',
  'CRÊS', 'CRIA', 'CRIE', 'CRIO', 'CRUA', 'CRUZ', 'CUBO', 'CUJA', 'CUJO', 'CUME', 'CURA', 'CURE',
  'CURO',

  'DADA', 'DADO', 'DAMA', 'DANO', 'DATA', 'DEÃO', 'DEDO', 'DEEM', 'DEMO', 'DEUS', 'DEVA', 'DEVE',
  'DEVI', 'DEVO', 'DIAS', 'DICA', 'DIGA', 'DIGO', 'DITA', 'DITO', 'DIVO', 'DOAR', 'DOCE', 'DOEM',
  'DOER', 'DOEU', 'DOIS', 'DONA', 'DONS', 'DOTE', 'DOZE', 'DUAS', 'DUNA', 'DURO',

  'ÉDEN', 'EDIL', 'ÉGUA', 'EIRA', 'EITO', 'EIXO', 'ÉLAN', 'ELAS', 'ELES', 'ELFO', 'ELMO', 'EMIR',
  'ENTE', 'ENXÓ', 'ERAS', 'ERGO', 'ERMA', 'ERMO', 'ERRA', 'ERRE', 'ERRO', 'ERVA', 'ESSA', 'ESSE',
  'ESTA', 'ESTE', 'ESTO', 'EXPO',

  'FACA', 'FAÇA', 'FACE', 'FAÇO', 'FADA', 'FADO', 'FAIA', 'FALA', 'FALE', 'FALO', 'FAMA', 'FARO',
  'FASE', 'FATO', 'FAVA', 'FAVO', 'FEIA', 'FEIO', 'FENO', 'FERA', 'FERO', 'FETO', 'FIAR', 'FICA',
  'FICO', 'FIEL', 'FILA', 'FILÉ', 'FINO', 'FINS', 'FIOU', 'FITA', 'FIXA', 'FIXE', 'FIXO', 'FLOR',
  'FOCA', 'FOCO', 'FOGE', 'FOGO', 'FOLE', 'FOME', 'FONE', 'FORA', 'FORO', 'FOTO', 'FREI', 'FRIA',
  'FRIO', 'FUGA', 'FUGI', 'FUMA', 'FUME', 'FUMO', 'FUNK', 'FURA', 'FURE', 'FURO', 'FUSO',

  'GABA', 'GABE', 'GABO', 'GADO', 'GAFA', 'GAFE', 'GAFO', 'GAGÁ', 'GAGO', 'GAIA', 'GAIO', 'GAJO',
  'GALÃ', 'GALÉ', 'GALO', 'GAMA', 'GANA', 'GARE', 'GATA', 'GATO', 'GAZA', 'GAZE', 'GELA', 'GELE',
  'GELO', 'GEMA', 'GENE', 'GERA', 'GERE', 'GERI', 'GERO', 'GIRA', 'GIRE', 'GIRO', 'GOLA', 'GOMA',
  'GOTA', 'GOZA', 'GOZE', 'GOZO', 'GRÃO', 'GRÃS', 'GRAU', 'GRUA', 'GUIA', 'GUME',

  'HAJA', 'HALL', 'HALO', 'HERA', 'HINO', 'HOJE', 'HORA', 'HUMO',

  'IÇAR', 'IDEM', 'IDOS', 'ILHA', 'ILHÓ', 'INDA', 'IODO', 'IOTA', 'IRAR', 'ÍRIS', 'IRMÃ', 'ISCA',
  'ISCO', 'ISSO', 'ISTO', 'ITEM',

  'JACA', 'JADE', 'JARO', 'JATO', 'JAZZ', 'JOGA', 'JOGE', 'JOGO', 'JOIA', 'JOTA', 'JUBA', 'JUGO',
  'JUIZ', 'JURA', 'JURE', 'JURO',

  'KART', 'KIWI',

  'LACA', 'LAÇO', 'LADA', 'LADO', 'LAGO', 'LAIA', 'LAIS', 'LAMA', 'LAPA', 'LATA', 'LATE', 'LATO',
  'LAVA', 'LAVE', 'LAVO', 'LAXO', 'LEAL', 'LEDO', 'LEIA', 'LEIO', 'LEIS', 'LEMA', 'LEME', 'LENA',
  'LERA', 'LESA', 'LESO', 'LEVA', 'LEVE', 'LEVO', 'LIGA', 'LIGO', 'LIMA', 'LIMO', 'LINK', 'LIRA',
  'LISA', 'LISO', 'LOBA', 'LOBO', 'LOCA', 'LOCO', 'LODO', 'LOGO', 'LOJA', 'LONA', 'LOTE', 'LUAU',
  'LUME', 'LUTA', 'LUTE', 'LUTO',

  'MAÇA', 'MAÇO', 'MÃES', 'MAGO', 'MAIO', 'MAIS', 'MALA', 'MAMA', 'MAME', 'MAMO', 'MANÁ', 'MANE',
  'MANO', 'MÃOS', 'MAPA', 'MARÉ', 'MATA', 'MATE', 'MATO', 'MAUS', 'MEÃO', 'MEÇA', 'MECO', 'MEÇO',
  'MEDA', 'MEDO', 'MEIA', 'MEIO', 'MELA', 'MELO', 'MESA', 'META', 'MEUS', 'MEXA', 'MEXE', 'MEXI',
  'MEXO', 'MICO', 'MIGA', 'MIGO', 'MINA', 'MINE', 'MINO', 'MIRA', 'MIRE', 'MIRO', 'MODA', 'MODO',
  'MOER', 'MOEU', 'MOLA', 'MOLE', 'MORA', 'MORE', 'MORO', 'MOTE', 'MOTO', 'MUDA', 'MUDE', 'MUDO',
  'MULA', 'MURO', 'MUSA',

  'NABO', 'NACO', 'NADA', 'NADE', 'NADO', 'NAGA', 'NATA', 'NATO', 'NAVA', 'NAVE', 'NEGA', 'NEGO',
  'NEVE', 'NEXO', 'NICA', 'NINA', 'NINO', 'NOJO', 'NOME', 'NONA', 'NONO', 'NORA', 'NOTA', 'NOVA',
  'NOVE', 'NOVO', 'NULA', 'NULO', 'NUMA', 'NUME', 'NUNS',

  'OBRA', 'ÓCIO', 'OCRE', 'ÓDIO', 'ODOR', 'ODRE', 'OGRO', 'OITO', 'OLHA', 'OLHE', 'OLHO', 'OLOR',
  'ONDA', 'ONDE', 'ÔNUS', 'ONZE', 'OPAR', 'ÓPIO', 'OPOR', 'ORAL', 'ORAR', 'ORBE', 'ORCA', 'ORLA',
  'OSSO', 'OUÇA', 'OUÇO', 'OURO', 'OUSA', 'OUSE', 'OUSO', 'OVAL', 'OVOS',

  'PAÇO', 'PÃES', 'PAGA', 'PAGO', 'PAIO', 'PAIS', 'PAÍS', 'PALA', 'PANO', 'PAPA', 'PAPO', 'PARA',
  'PARE', 'PARO', 'PATA', 'PATO', 'PAUS', 'PAVO', 'PEÃO', 'PEÇA', 'PECO', 'PEGA', 'PEGO', 'PEIA',
  'PELA', 'PELE', 'PELO', 'PENA', 'PERA', 'PESA', 'PESE', 'PESO', 'PICA', 'PICO', 'PIFE', 'PINO',
  'PIPA', 'PIRA', 'PIRE', 'PIRO', 'PISA', 'PISE', 'PISO', 'PODE', 'PÔDE', 'POIS', 'POMO', 'POTE',
  'POVO', 'PUBS', 'PULA', 'PULE', 'PULO', 'PUMA', 'PURA', 'PURO',

  'QUAL', 'QUÃO', 'QUEM',

  'RABI', 'RABO', 'RAÇA', 'RAIA', 'RAIO', 'RAIZ', 'RALA', 'RALE', 'RALÉ', 'RALO', 'RAMA', 'RAMO',
  'RAPÉ', 'RARA', 'RARO', 'RASA', 'RASO', 'RATA', 'RATO', 'REAL', 'REBO', 'REIS', 'REMA', 'REME',
  'REMO', 'RÉUS', 'REZA', 'REZE', 'REZO', 'RICA', 'RICO', 'RIFA', 'RIFE', 'RIFO', 'RIMA', 'RIME',
  'RIMO', 'RINS', 'RIOS', 'RIPA', 'RISO', 'RITO', 'ROCA', 'ROÇA', 'ROCK', 'ROÇO', 'RODA', 'RODE',
  'RODO', 'ROGA', 'ROGO', 'ROMA', 'ROSA', 'ROTA', 'ROTE', 'ROTO', 'RUAS', 'RUIU', 'RUMA', 'RUME',
  'RUMO', 'RUSO',

  'SACA', 'SACO', 'SAFA', 'SAFO', 'SAGA', 'SAGU', 'SAIA', 'SAIR', 'SAIU', 'SALA', 'SAMO', 'SÃOS',
  'SAPA', 'SATÃ', 'SEBE', 'SEBO', 'SECA', 'SECO', 'SEDA', 'SEDE', 'SEIO', 'SEIS', 'SEJA', 'SELO',
  'SENA', 'SENO', 'SERA', 'SERÁ', 'SETA', 'SETE', 'SEUS', 'SHOW', 'SINA', 'SINO', 'SISO', 'SITE',
  'SOAM', 'SOAR', 'SOEI', 'SOEM', 'SOIS', 'SOLA', 'SOLE', 'SOLO', 'SOMA', 'SOME', 'SOMI', 'SOMO',
  'SONO', 'SOPA', 'SUAR', 'SUAS', 'SUBA', 'SUBI', 'SUJO', 'SUMA', 'SUME', 'SUMI', 'SUMO',

  'TABU', 'TAÇA', 'TACO', 'TAIS', 'TALA', 'TALO', 'TAPA', 'TARA', 'TATO', 'TAXA', 'TÁXI', 'TEAR',
  'TEIA', 'TEIS', 'TELA', 'TEMA', 'TEME', 'TEMO', 'TEOR', 'TESA', 'TESE', 'TESO', 'TETA', 'TETO',
  'TEUS', 'TIPO', 'TIRA', 'TIRE', 'TIRO', 'TOCA', 'TOCO', 'TODA', 'TODO', 'TOJO', 'TOMA', 'TOME',
  'TOMO', 'TORA', 'TORO', 'TOSA', 'TOSE', 'TOSO', 'TRÁS', 'TRAZ', 'TREM', 'TRÊS', 'TRIO', 'TROA',
  'TUBA', 'TUBO', 'TUDO', 'TUPI',

  'UGAR', 'UIVA', 'UIVE', 'UIVO', 'ULTO', 'UNAM', 'UNHA', 'UNIR', 'UNIU', 'UNTO', 'URBE', 'URNA',
  'URRA', 'URRE', 'URRO', 'URSO', 'URZE', 'USAR', 'USEI', 'USEM', 'USOU', 'USTO', 'ÚTIL',

  'VACA', 'VAGA', 'VAGO', 'VAIA', 'VALA', 'VALE', 'VÃOS', 'VARA', 'VASO', 'VATE', 'VAZA', 'VAZE',
  'VAZO', 'VEDA', 'VEIA', 'VEIO', 'VEJA', 'VEJO', 'VELA', 'VELE', 'VELO', 'VERA', 'VERO', 'VETA',
  'VETE', 'VETO', 'VÉUS', 'VIDA', 'VIGA', 'VILA', 'VIME', 'VIRA', 'VIRE', 'VIRO', 'VISA', 'VISE',
  'VISO', 'VIVA', 'VIVE', 'VIVO', 'VOAM', 'VOAR', 'VOEI', 'VOEM', 'VOGA', 'VOTA', 'VOTE', 'VOTO',

  'WIFI',

  'XALE', 'XARÁ', 'XEPA', 'XIXI',

  'YOGA',

  'ZELA', 'ZELE', 'ZELO', 'ZERA', 'ZERO', 'ZETA', 'ZONA', 'ZUNE'
]);

export const MISSION_05_PANELS = Object.freeze([
  {
    lang: 'PT-BR',
    candidates: ['TIGELA', 'PANELA', 'CANELA', 'JANELA', 'TUTELA'],
    answer: 'TIGELA',
    extracted: 'A',
    index: 6
  },
  {
    lang: 'EN',
    candidates: ['CREAM', 'DREAM', 'BREAK', 'CLEAR', 'GREAT'],
    answer: 'CREAM',
    extracted: 'C',
    index: 1
  },
  {
    lang: 'FR',
    candidates: ['FRAISE', 'BRAISE', 'FRANGE', 'FRAUDE', 'FRISEE'],
    answer: 'FRAISE',
    extracted: 'A',
    index: 3
  },
  {
    lang: 'ES',
    candidates: ['FRÍO', 'FRÍA', 'TRÍO', 'CRÍO', 'BRÍO'],
    answer: 'FRÍO',
    extracted: 'I',
    index: 3
  }
]);


/*
 * Normalização usada tanto no dicionário quanto na resposta.
 *
 * Exemplos:
 *
 * AÇAÍ -> ACAI
 * AÇAI -> ACAI
 * ACAÍ -> ACAI
 * Ç    -> C
 * Á    -> A
 */
function normalizeWord(value = '') {
  return value
    .trim()
    .toLocaleUpperCase('pt-BR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}


/*
 * Dicionário normalizado.
 *
 * Dessa maneira C/Ç e caracteres acentuados são automaticamente
 * considerados equivalentes.
 */
const NORMALIZED_WORDS = new Set(
  MISSION_05_WORDS
    .map(normalizeWord)
    .filter((word) => word.length === WORD_LENGTH)
);

const NORMALIZED_ANSWERS = ANSWERS.map(normalizeWord);


/*
 * Avaliação no estilo Wordle/Termo.
 *
 * A avaliação precisa acontecer em duas passagens para que letras
 * repetidas funcionem corretamente.
 *
 * Primeiro:
 *   posições verdes.
 *
 * Depois:
 *   posições amarelas.
 *
 * Isso evita marcar como amarelo uma letra que já foi consumida por
 * outra ocorrência.
 */
function evaluateGuess(rawGuess, normalizedAnswer) {
  const guess = normalizeWord(rawGuess);
  const answer = normalizedAnswer;

  const result = Array(WORD_LENGTH).fill('absent');

  const remainingAnswer = answer.split('');


  // 1ª passagem: letras na posição correta.
  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (guess[i] === answer[i]) {
      result[i] = 'correct';
      remainingAnswer[i] = null;
    }
  }


  // 2ª passagem: letras existentes em outra posição.
  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (result[i] === 'correct') continue;

    const letter = guess[i];

    const matchingIndex = remainingAnswer.findIndex(
      (answerLetter) => answerLetter === letter
    );

    if (matchingIndex !== -1) {
      result[i] = 'present';
      remainingAnswer[matchingIndex] = null;
    }
  }

  return result;
}


export function mountMission05(host, context) {
  const view = createMissionShell({
    mission: context.mission,
    ...context
  });

  view.root.classList.add('mission-quarteto');


  /*
   * Estado da partida.
   */
  const boardCount = ANSWERS.length;
  let guesses = [];
  let currentGuess = '';
  let finished = false;
  let solvedBoards = Array(boardCount).fill(false);


  /*
   * HTML principal.
   *
    * Quarteto: quatro grades paralelas com o mesmo chute.
   */
  view.content.innerHTML = `
    <div class="termo-mission">

      <div class="termo-actions">
        <button
          class="button secondary"
          data-reset
          type="button"
        >
          Reiniciar jogo
        </button>
      </div>

      <p
        class="termo-progress"
        data-progress
      ></p>

      <div class="termo-boards" data-boards>
        ${Array.from({ length: boardCount }, (_, board) => `
            <div
              class="termo-board"
              data-board="${board}"
              aria-label="Grade de tentativas da palavra ${board + 1}"
            >
              ${Array.from({ length: MAX_ATTEMPTS }, (_, row) => `
                <div
                  class="termo-row"
                  data-board="${board}"
                  data-row="${row}"
                >
                  ${Array.from({ length: WORD_LENGTH }, (_, column) => `
                    <div
                      class="termo-tile"
                      data-tile
                      data-board="${board}"
                      data-row="${row}"
                      data-column="${column}"
                    ></div>
                  `).join('')}
                </div>
              `).join('')}
            </div>
        `).join('')}
      </div>

      <p
        class="termo-message"
        data-message
        aria-live="polite"
      ></p>

      <div
        class="termo-keyboard"
        data-keyboard
        aria-label="Teclado"
      >

        <div class="termo-keyboard-row">
          ${createKeyboardKeys('QWERTYUIOP')}
        </div>

        <div class="termo-keyboard-row">
          ${createKeyboardKeys('ASDFGHJKL')}
        </div>

        <div class="termo-keyboard-row">
          <button
            class="termo-key termo-key-wide"
            data-key="ENTER"
            type="button"
          >
            ENTER
          </button>

          ${createKeyboardKeys('ZXCVBNM')}

          <button
            class="termo-key termo-key-wide"
            data-key="BACKSPACE"
            type="button"
            aria-label="Apagar"
          >
            ⌫
          </button>
        </div>

      </div>

    </div>

    <section class="termo-extraction" data-extraction hidden>
      <h2>Vale ?</h2>

      <div
        class="termo-extraction-words"
        data-extraction-words
        aria-label="Letras indicadas para a extração"
      ></div>

      <form class="answer-form" data-form>
        <label for="mission-05-answer">
          Qual palavra foi extraída?
        </label>

        <input
          id="mission-05-answer"
          name="answer"
          autocomplete="off"
          autocapitalize="characters"
          required
        />

        <button
          class="button primary"
          type="submit"
        >
          Validar palavra
        </button>
      </form>
    </section>

    <section class="mission-bonus" data-bonus hidden>
      <h2>Memória desbloqueada</h2>

      <p>
        A tigela da Maria Açaí, com bastante morango.
      </p>

      <p>
        O Oakberry dele, com banana, leite condensado, mel e leite em pó.
      </p>

      <p>
        Um pequeno vale para celebrar um momento doce, do jeito de vocês.
      </p>
    </section>
  `;


  /*
   * Cria as teclas de letras.
   */
  function createKeyboardKeys(letters) {
    return [...letters]
      .map((letter) => `
        <button
          class="termo-key"
          data-key="${letter}"
          data-normalized-key="${normalizeWord(letter)}"
          type="button"
        >
          ${letter}
        </button>
      `)
      .join('');
  }


  const messageElement = view.content.querySelector('[data-message]');
  const progressElement = view.content.querySelector('[data-progress]');
  const extractionElement = view.content.querySelector('[data-extraction]');
  const extractionWordsElement = view.content.querySelector('[data-extraction-words]');
  const form = view.content.querySelector('[data-form]');
  const bonus = view.content.querySelector('[data-bonus]');
  const resetButton = view.content.querySelector('[data-reset]');


  function showMessage(message, type = '') {
    messageElement.textContent = message;
    messageElement.dataset.type = type;
  }


  function renderProgress() {
    const usedAttempts = guesses.length;
    const nextAttempt = Math.min(usedAttempts + 1, MAX_ATTEMPTS);

    progressElement.textContent =
      `Tentativa ${nextAttempt} de ${MAX_ATTEMPTS}`;
  }


  function renderExtraction() {
    extractionWordsElement.innerHTML = MISSION_05_EXTRACTION_INDICES
      .map((index, board) => {
        const placeholders = Array.from({ length: WORD_LENGTH });

        return `
          <span
            class="termo-extraction-word"
            role="img"
            aria-label="Palavra ${board + 1}, índice ${index}"
          >
          ${placeholders.map((_, column) => `
              <span
                class="termo-extraction-letter${column === index ? ' termo-extraction-selected' : ''}"
                ${column === index ? 'aria-hidden="true"' : ''}
              >
                ${column === index ? '<span class="termo-extraction-arrow" aria-hidden="true">↓</span>' : ''}
                ?
              </span>
            `).join('')}
          </span>
        `;
      })
      .join('');

    extractionElement.hidden = false;
  }


  /*
   * Retorna uma célula específica da grade.
   */
  function getTile(board, row, column) {
    return view.content.querySelector(
      `[data-tile][data-board="${board}"][data-row="${row}"][data-column="${column}"]`
    );
  }


  /*
   * Atualiza a linha que está sendo digitada.
   */
  function renderCurrentGuess() {
    const row = guesses.length;

    if (row >= MAX_ATTEMPTS) return;

    for (let board = 0; board < boardCount; board += 1) {
      if (solvedBoards[board]) continue;

      for (let column = 0; column < WORD_LENGTH; column += 1) {
        const tile = getTile(board, row, column);

        tile.textContent = currentGuess[column] ?? '';

        tile.classList.toggle(
          'termo-tile-filled',
          Boolean(currentGuess[column])
        );
      }
    }
  }


  /*
   * Hierarquia das cores do teclado.
   *
   * Uma tecla verde nunca deve voltar a amarelo ou cinza.
   * Uma tecla amarela nunca deve voltar a cinza.
   */
  const KEY_PRIORITY = {
    absent: 1,
    present: 2,
    correct: 3
  };


  function updateKeyboard(letter, state) {
    const normalizedLetter = normalizeWord(letter);

    const keys = view.content.querySelectorAll(
      `[data-normalized-key="${normalizedLetter}"]`
    );

    keys.forEach((key) => {
      const previousState = key.dataset.state;

      const previousPriority =
        KEY_PRIORITY[previousState] ?? 0;

      const newPriority =
        KEY_PRIORITY[state] ?? 0;

      if (newPriority < previousPriority) return;

      key.dataset.state = state;

      key.classList.remove(
        'termo-key-absent',
        'termo-key-present',
        'termo-key-correct'
      );

      key.classList.add(`termo-key-${state}`);
    });
  }


  /*
   * Exibe uma tentativa já validada.
   */
  function paintGuess(board, row, rawGuess, evaluation) {
    const displayGuess = rawGuess.toLocaleUpperCase('pt-BR');

    for (let column = 0; column < WORD_LENGTH; column += 1) {
      const tile = getTile(board, row, column);

      const state = evaluation[column];
      const letter = displayGuess[column];

      tile.textContent = letter;

      tile.classList.remove(
        'termo-tile-filled',
        'termo-tile-absent',
        'termo-tile-present',
        'termo-tile-correct'
      );

      tile.classList.add(
        `termo-tile-${state}`
      );

      updateKeyboard(letter, state);
    }
  }


  /*
   * Faz a linha "tremer" quando a tentativa é inválida.
   *
   * Caso você não queira animação, basta ignorar essa classe
   * no CSS.
   */
  function shakeCurrentRow() {
    for (let board = 0; board < boardCount; board += 1) {
      if (solvedBoards[board]) continue;

      const row = view.content.querySelector(
        `[data-board="${board}"][data-row="${guesses.length}"].termo-row`
      );

      if (!row) continue;

      row.classList.remove('termo-row-invalid');

      // força reflow para permitir repetir a animação
      void row.offsetWidth;

      row.classList.add('termo-row-invalid');
    }
  }


  /*
   * Verifica a tentativa após ENTER.
   */
  function submitGuess() {
    if (finished || view.blocked) return;


    if (currentGuess.length !== WORD_LENGTH) {
      showMessage(
        `Digite uma palavra de ${WORD_LENGTH} letras.`,
        'error'
      );

      shakeCurrentRow();
      return;
    }


    const normalizedGuess = normalizeWord(currentGuess);


    /*
     * PRIMEIRO verificamos se a palavra existe no dicionário.
     *
     * Só depois comparamos com a resposta.
     */
    if (!NORMALIZED_WORDS.has(normalizedGuess)) {
      showMessage(
        'Essa palavra não está na lista.',
        'error'
      );

      shakeCurrentRow();
      return;
    }


    const row = guesses.length;

    for (let board = 0; board < boardCount; board += 1) {
      if (solvedBoards[board]) continue;

      const evaluation = evaluateGuess(
        currentGuess,
        NORMALIZED_ANSWERS[board]
      );

      paintGuess(
        board,
        row,
        currentGuess,
        evaluation
      );

      if (normalizedGuess === NORMALIZED_ANSWERS[board]) {
        solvedBoards[board] = true;
      }
    }


    /*
     * Salvamos a tentativa usando a forma digitada pelo jogador.
     */
    guesses.push(currentGuess);


    view.saveData({
      guesses
    });


    /*
     * Vitória.
     */
    if (solvedBoards.every(Boolean)) {
      finished = true;

      showMessage(
        'Seu vale foi desbloqueado! Parabéns!',
        'success'
      );

      renderExtraction();

      renderProgress();

      return;
    }


    /*
     * Última tentativa.
     */
    if (guesses.length >= MAX_ATTEMPTS) {
      finished = true;

      const missingAnswers = ANSWERS.filter(
        (_, index) => !solvedBoards[index]
      ).join(', ');

      showMessage(
        `Fim das tentativas. Respostas: ${missingAnswers}.`,
        'error'
      );

      renderProgress();

      return;
    }


    /*
     * Próxima tentativa.
     */
    currentGuess = '';

    renderCurrentGuess();

    showMessage('');
    renderProgress();
  }


  /*
   * Entrada de letras.
   */
  function insertLetter(letter) {
    if (finished || view.blocked) return;

    if (currentGuess.length >= WORD_LENGTH) return;

    /*
     * Aceitamos apenas uma letra.
     */
    if (!/^\p{L}$/u.test(letter)) return;

    currentGuess += letter.toLocaleUpperCase('pt-BR');

    renderCurrentGuess();

    showMessage('');
  }


  /*
   * Backspace.
   */
  function removeLetter() {
    if (finished || view.blocked) return;

    if (!currentGuess.length) return;

    currentGuess = currentGuess.slice(0, -1);

    renderCurrentGuess();

    showMessage('');
  }


  /*
   * Centraliza todas as ações do teclado.
   */
  function handleKey(key) {
    if (finished || view.blocked) return;

    if (key === 'ENTER') {
      submitGuess();
      return;
    }

    if (key === 'BACKSPACE') {
      removeLetter();
      return;
    }

    insertLetter(key);
  }


  /*
   * Teclado na tela.
   */
  view.content
    .querySelector('[data-keyboard]')
    .addEventListener('click', (event) => {

      const button = event.target.closest('[data-key]');

      if (!button) return;

      handleKey(button.dataset.key);
    });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (view.blocked) return;

    if (
      matchesAnswer(
        event.currentTarget.answer.value,
        FINAL_ANSWER
      )
    ) {
      view.success('Seu primeiro vale é um AÇAÍ.');
      bonus.hidden = false;
      event.currentTarget.answer.disabled = true;
      event.currentTarget.querySelector('button[type="submit"]').disabled = true;
      return;
    }

    view.fail('A palavra extraída ainda não foi validada.');
  });


  /*
   * Teclado físico.
   */
  const physicalKeyboardHandler = (event) => {
    if (finished || view.blocked) return;


    if (event.key === 'Enter') {
      event.preventDefault();

      handleKey('ENTER');

      return;
    }


    if (event.key === 'Backspace') {
      event.preventDefault();

      handleKey('BACKSPACE');

      return;
    }


    /*
     * Letras normais, inclusive caracteres acentuados e Ç.
     */
    if (/^\p{L}$/u.test(event.key)) {
      event.preventDefault();

      handleKey(
        event.key.toLocaleUpperCase('pt-BR')
      );
    }
  };


  window.addEventListener(
    'keydown',
    physicalKeyboardHandler
  );


  resetButton.addEventListener('click', () => {
    window.removeEventListener('keydown', physicalKeyboardHandler);
    context.store.clear(context.mission.id);
    mountMission05(host, context);
  });


  /*
   * RESTAURAÇÃO DAS TENTATIVAS SALVAS
   *
   * Caso a pessoa saia da missão e volte depois,
   * reconstruímos a grade.
   */
  const savedGuesses =
    view.saved.stageData?.guesses ?? [];


  if (Array.isArray(savedGuesses)) {
    savedGuesses
      .slice(0, MAX_ATTEMPTS)
      .forEach((savedGuess) => {

        const normalizedSavedGuess =
          normalizeWord(savedGuess);

        if (
          normalizedSavedGuess.length !== WORD_LENGTH ||
          !NORMALIZED_WORDS.has(normalizedSavedGuess)
        ) {
          return;
        }

        const row = guesses.length;

        for (let board = 0; board < boardCount; board += 1) {
          if (solvedBoards[board]) continue;

          const evaluation = evaluateGuess(
            savedGuess,
            NORMALIZED_ANSWERS[board]
          );

          paintGuess(
            board,
            row,
            savedGuess,
            evaluation
          );

          if (normalizedSavedGuess === NORMALIZED_ANSWERS[board]) {
            solvedBoards[board] = true;
          }
        }

        guesses.push(savedGuess);
      });
  }


  if (solvedBoards.every(Boolean)) {
    finished = true;

    showMessage(
      'Fácil? Acho que sim!',
      'success'
    );

    renderExtraction();

    if (view.saved.completed) {
      bonus.hidden = false;
      form.answer.disabled = true;
      form.querySelector('button[type="submit"]').disabled = true;
    }
  }


  /*
   * Se já gastou todas as tentativas.
   */
  if (!finished && guesses.length >= MAX_ATTEMPTS) {
    finished = true;

    showMessage(
      'Fim das tentativas. Use “Reiniciar jogo” para tentar novamente.',
      'error'
    );
  }

  renderProgress();

  if (!finished) {
    renderCurrentGuess();
  }


  /*
   * Coloca o componente na tela.
   */
  host.replaceChildren(view.root);
}
