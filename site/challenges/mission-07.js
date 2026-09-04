import { matchesAnswer } from '../core/normalize.js';
import { createMissionShell } from '../components/mission-shell.js';

const MINUTES_PER_HOUR = 60;
export const MISSION_07_BUDGET = 60;
export const MISSION_07_TOTAL_PACKAGES = 63;
export const MISSION_07_CAPACITY = MISSION_07_TOTAL_PACKAGES;

export const MISSION_07_NODES = Object.freeze([
  Object.freeze({ id: 'I', label: 'Instituto Central', letter: 'I', packages: 12, service: 4, window: [0, 12], kind: 'target' }),
  Object.freeze({ id: 'F', label: 'Feira Norte', letter: 'F', packages: 14, service: 4, window: [0, 25], kind: 'target' }),
  Object.freeze({ id: 'O1', label: 'Oficina Sul', letter: 'O', packages: 10, service: 4, window: [0, 40], kind: 'target' }),
  Object.freeze({ id: 'O2', label: 'Ótica Leste', letter: 'O', packages: 11, service: 4, window: [0, 50], kind: 'target' }),
  Object.freeze({ id: 'D', label: 'Doca Final', letter: 'D', packages: 16, service: 4, window: [0, 60], kind: 'target' }),
  Object.freeze({ id: 'K', label: 'Kiosque do Canal', letter: 'K', packages: 8, service: 8, window: [0, 60], kind: 'detour' }),
  Object.freeze({ id: 'G', label: 'Galpão da Gare', letter: 'G', packages: 10, service: 8, window: [0, 60], kind: 'detour' }),
  Object.freeze({ id: 'E', label: 'Estação Leste', letter: 'E', packages: 12, service: 8, window: [0, 60], kind: 'detour' }),
  Object.freeze({ id: 'L', label: 'Largo das Flores', letter: 'L', packages: 14, service: 8, window: [0, 60], kind: 'detour' })
]);

export const MISSION_07_TRAVEL = Object.freeze({
  H: Object.freeze({ I: 2, F: 8, O1: 12, O2: 18, D: 24, K: 9, G: 11, E: 14, L: 16 }),
  I: Object.freeze({ H: 2, F: 4, O1: 10, O2: 16, D: 22, K: 8, G: 12, E: 15, L: 17 }),
  F: Object.freeze({ H: 8, I: 4, O1: 4, O2: 10, D: 16, K: 9, G: 8, E: 13, L: 15 }),
  O1: Object.freeze({ H: 12, I: 10, F: 4, O2: 4, D: 10, K: 12, G: 10, E: 8, L: 13 }),
  O2: Object.freeze({ H: 18, I: 16, F: 10, O1: 4, D: 4, K: 14, G: 12, E: 10, L: 8 }),
  D: Object.freeze({ H: 24, I: 22, F: 16, O1: 10, O2: 4, K: 18, G: 16, E: 14, L: 12 }),
  K: Object.freeze({ H: 9, I: 8, F: 9, O1: 12, O2: 14, D: 18, G: 5, E: 8, L: 10 }),
  G: Object.freeze({ H: 11, I: 12, F: 8, O1: 10, O2: 12, D: 16, K: 5, E: 5, L: 8 }),
  E: Object.freeze({ H: 14, I: 15, F: 13, O1: 8, O2: 10, D: 14, K: 8, G: 5, L: 5 }),
  L: Object.freeze({ H: 16, I: 17, F: 15, O1: 13, O2: 8, D: 12, K: 10, G: 8, E: 5 })
});

export const MISSION_07_ROUTE = Object.freeze(['I', 'F', 'O1', 'O2', 'D']);
export const MISSION_07_ACCEPTED = Object.freeze(['IFOOD']);
const NODE_BY_ID = new Map(MISSION_07_NODES.map((node) => [node.id, node]));
const GRAPH_IDS = Object.freeze(['H', ...MISSION_07_NODES.map((node) => node.id)]);
const GRAPH_POSITIONS = Object.freeze({
  H: Object.freeze({ x: 100, y: 270 }),
  I: Object.freeze({ x: 270, y: 110 }),
  F: Object.freeze({ x: 450, y: 75 }),
  O1: Object.freeze({ x: 640, y: 140 }),
  O2: Object.freeze({ x: 760, y: 310 }),
  D: Object.freeze({ x: 635, y: 465 }),
  K: Object.freeze({ x: 420, y: 465 }),
  G: Object.freeze({ x: 250, y: 420 }),
  E: Object.freeze({ x: 120, y: 115 }),
  L: Object.freeze({ x: 840, y: 115 })
});

function formatClock(minutes) {
  const hours = 8 + Math.floor(minutes / MINUTES_PER_HOUR);
  const remainder = minutes % MINUTES_PER_HOUR;
  return `${String(hours).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

function getTravel(from, to) {
  return MISSION_07_TRAVEL[from]?.[to] ?? null;
}

function scoreFor(packages, elapsed, stops) {
  return [packages, -elapsed, -stops];
}

export function compareMission07Scores(left, right) {
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) return left[index] > right[index] ? 1 : -1;
  }
  return 0;
}

function evaluatePath(route, complete = false) {
  if (!Array.isArray(route) || route.length > MISSION_07_NODES.length) {
    return { valid: false, reason: 'A rota ultrapassou o número de locais.', schedule: [] };
  }
  if (route.some((id) => !NODE_BY_ID.has(id))) {
    return { valid: false, reason: 'A rota contém um local desconhecido.', schedule: [] };
  }
  if (new Set(route).size !== route.length) {
    return { valid: false, reason: 'Cada local só pode aparecer uma vez.', schedule: [] };
  }
  if (route.includes('D') && route.at(-1) !== 'D') {
    return { valid: false, reason: 'A Doca Final precisa ser o último local da rota.', schedule: [] };
  }
  if (complete && route.at(-1) !== 'D') {
    return { valid: false, reason: 'Finalize a rota chegando à Doca Final.', schedule: [] };
  }

  let elapsed = 0;
  let packages = 0;
  let capacityUsed = 0;
  let previous = 'H';
  let failureReason = '';
  const schedule = [];
  const makeResult = (valid, reason = '') => {
    const completeRoute = route.at(-1) === 'D';
    return {
      valid,
      complete: completeRoute,
      reason,
      route: [...route],
      schedule,
      packages,
      capacityUsed,
      remainingPackages: MISSION_07_TOTAL_PACKAGES - packages,
      elapsed,
      stops: route.length,
      detours: route.filter((id) => NODE_BY_ID.get(id).kind === 'detour').length,
      efficiency: elapsed ? packages / elapsed : 0,
      code: route.map((id) => NODE_BY_ID.get(id).letter).join(''),
      score: scoreFor(packages, elapsed, route.length)
    };
  };

  for (const id of route) {
    const travel = getTravel(previous, id);
    if (travel === null) {
      return makeResult(false, `Não há conexão entre ${previous} e ${id}.`);
    }
    const node = NODE_BY_ID.get(id);
    const arrival = elapsed + travel;
    const serviceStart = Math.max(arrival, node.window[0]);
    if (serviceStart > node.window[1]) {
      return makeResult(false, `${node.label} perde a janela de atendimento.`);
    }
    packages += node.packages;
    capacityUsed += node.packages;
    if (packages > MISSION_07_TOTAL_PACKAGES && !failureReason) {
      failureReason = `O número de pacotes restantes ficou negativo (${MISSION_07_TOTAL_PACKAGES - packages}).`;
    }
    elapsed = serviceStart + node.service;
    if (elapsed > MISSION_07_BUDGET && !failureReason) failureReason = 'A rota ultrapassa o prazo de 60 minutos.';
    schedule.push({ id, arrival: formatClock(arrival), serviceStart: formatClock(serviceStart), departure: formatClock(elapsed) });
    previous = id;
  }

  if (complete && packages > MISSION_07_TOTAL_PACKAGES) failureReason = `O número de pacotes restantes ficou negativo (${MISSION_07_TOTAL_PACKAGES - packages}).`;
  return makeResult(!failureReason, failureReason);
}

export function validateMission07Route(route) {
  return evaluatePath(route, true);
}

export function enumerateMission07Routes() {
  const routes = [];
  function visit(route) {
    for (const node of MISSION_07_NODES) {
      if (route.includes(node.id)) continue;
      const nextRoute = [...route, node.id];
      const result = evaluatePath(nextRoute, node.id === 'D');
      if (!result.valid) continue;
      if (node.id === 'D') routes.push(result);
      else visit(nextRoute);
    }
  }
  visit([]);
  return routes;
}

export const MISSION_07_FEASIBLE_ROUTES = Object.freeze(enumerateMission07Routes());
export const MISSION_07_OPTIMAL = MISSION_07_FEASIBLE_ROUTES.reduce((best, candidate) => (
  !best || compareMission07Scores(candidate.score, best.score) > 0 ? candidate : best
), null);
export const MISSION_07_OPTIMAL_ROUTE = Object.freeze(MISSION_07_OPTIMAL.route ?? MISSION_07_ROUTE);

const MISSION_07_STYLE = `
  .mission-07-visual { display: grid; gap: 18px; }
  .mission-07-visual [hidden] { display: none; }
  .mission-07-brief p, .mission-07-route-status, .mission-07-answer-head p { margin: 0; color: var(--muted); line-height: 1.6; }
  .mission-07-dashboard { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
  .mission-07-stat { padding: 14px; border: 1px solid var(--line); border-radius: 14px; background: #0c151d; }
  .mission-07-stat > span { display: block; color: var(--muted); font-size: .72rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
  .mission-07-stat strong { display: block; margin-top: 4px; color: var(--accent); font-size: 1.35rem; }
  .mission-07-meter { height: 7px; margin-top: 9px; overflow: hidden; border-radius: 99px; background: #263744; }
  .mission-07-meter span { display: block; height: 100%; border-radius: inherit; background: var(--success); transition: width .25s ease; }
  .mission-07-meter span.is-low { background: var(--danger); }
  .mission-07-graph-wrap { overflow-x: auto; padding: 8px; border: 1px solid var(--line); border-radius: 16px; background: radial-gradient(circle at 50% 50%, #1a2a36, #0b141c 72%); }
  .mission-07-graph { display: block; width: 100%; min-width: 820px; height: auto; }
  .mission-07-edge line { stroke: #49606e; stroke-width: 2; opacity: .55; }
  .mission-07-edge text { fill: #91a5b2; font-size: 10px; font-weight: 700; paint-order: stroke; stroke: #0b141c; stroke-width: 5px; }
  .mission-07-edge.is-traveled line { stroke: var(--accent); stroke-width: 6; opacity: 1; }
  .mission-07-edge.is-traveled text { fill: #ffd49f; }
  .mission-07-node { cursor: pointer; outline: none; }
  .mission-07-node[aria-disabled="true"] { cursor: default; }
  .mission-07-node-ring, .mission-07-node-core { transition: fill .2s ease, stroke .2s ease, opacity .2s ease; }
  .mission-07-node-ring { fill: transparent; stroke: #49606e; stroke-width: 2; }
  .mission-07-node-core { fill: #172631; stroke: #8296a2; stroke-width: 2; }
  .mission-07-node[data-kind="detour"] .mission-07-node-core { fill: #172631; stroke: #8296a2; }
  .mission-07-node-letter { fill: var(--ink); font-size: 25px; font-weight: 900; }
  .mission-07-node-id { fill: var(--accent); font-size: 12px; font-weight: 900; }
  .mission-07-node-meta { fill: #91a5b2; font-size: 10px; }
  .mission-07-node:not([aria-disabled="true"]):hover .mission-07-node-core, .mission-07-node:focus-visible .mission-07-node-core { fill: #263c49; stroke: var(--accent); }
  .mission-07-node[data-state="visited"] .mission-07-node-ring { fill: #f2b56b22; stroke: var(--accent); stroke-width: 4; }
  .mission-07-node[data-state="visited"] .mission-07-node-core { fill: var(--accent); stroke: #ffe3b9; }
  .mission-07-node[data-state="visited"] .mission-07-node-letter { fill: #1b1209; }
  .mission-07-hub circle { fill: #203746; stroke: #8bd8b0; stroke-width: 2; }
  .mission-07-hub text { fill: var(--success); font-size: 24px; font-weight: 900; }
  .mission-07-hub-label { fill: #91a5b2 !important; font-size: 11px !important; }
  .mission-07-route { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
  .mission-07-route li { display: grid; grid-template-columns: 28px 1fr auto; align-items: center; gap: 9px; min-height: 44px; padding: 8px 10px; border: 1px solid var(--line); border-radius: 10px; color: var(--muted); background: #0c151d; }
  .mission-07-route li.is-filled { border-color: #866536; color: var(--ink); background: #211b14; }
  .mission-07-route li.is-detour { border-color: #866536; color: var(--ink); background: #211b14; }
  .mission-07-route li strong { color: var(--accent); }
  .mission-07-route li small { color: var(--muted); }
  .mission-07-actions { display: flex; flex-wrap: wrap; gap: 10px; }
  .mission-07-actions .button:disabled { opacity: .45; }
  .mission-07-answer-head { display: grid; gap: 8px; }
  @media (max-width: 720px) { .mission-07-dashboard { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 560px) { .mission-07-dashboard { grid-template-columns: 1fr; } .mission-07-actions { display: grid; grid-template-columns: 1fr; } .mission-07-actions .button { width: 100%; } }
`;

function edgeKey(from, to) {
  return [from, to].sort((left, right) => GRAPH_IDS.indexOf(left) - GRAPH_IDS.indexOf(right)).join('|');
}

function renderGraphEdges() {
  const edges = [];
  for (let fromIndex = 0; fromIndex < GRAPH_IDS.length; fromIndex += 1) {
    for (let toIndex = fromIndex + 1; toIndex < GRAPH_IDS.length; toIndex += 1) {
      const from = GRAPH_IDS[fromIndex];
      const to = GRAPH_IDS[toIndex];
      const travel = getTravel(from, to);
      const start = GRAPH_POSITIONS[from];
      const end = GRAPH_POSITIONS[to];
      const midpoint = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
      edges.push(`<g class="mission-07-edge" data-edge="${edgeKey(from, to)}" aria-hidden="true"><line x1="${start.x}" y1="${start.y}" x2="${end.x}" y2="${end.y}"></line><text x="${midpoint.x}" y="${midpoint.y - 5}" text-anchor="middle">${travel} min</text></g>`);
    }
  }
  return edges.join('');
}

function renderGraphNodes() {
  const nodes = MISSION_07_NODES.map((node) => {
    const position = GRAPH_POSITIONS[node.id];
    return `<g class="mission-07-node" data-node-id="${node.id}" data-kind="${node.kind}" data-state="available" role="button" tabindex="0" aria-disabled="false" aria-label="${node.label}. Letra ${node.letter}. ${node.packages} pacote${node.packages === 1 ? '' : 's'}. Janela até ${formatClock(node.window[1])}."><circle class="mission-07-node-ring" cx="${position.x}" cy="${position.y}" r="38"></circle><circle class="mission-07-node-core" cx="${position.x}" cy="${position.y}" r="28"></circle><text class="mission-07-node-letter" x="${position.x}" y="${position.y + 8}" text-anchor="middle">${node.letter}</text><text class="mission-07-node-id" x="${position.x}" y="${position.y + 54}" text-anchor="middle">${node.id}</text><text class="mission-07-node-meta" x="${position.x}" y="${position.y + 70}" text-anchor="middle">${node.packages} pac.</text></g>`;
  }).join('');
  const hub = GRAPH_POSITIONS.H;
  return `<g class="mission-07-hub" aria-label="Hub de saída às 08:00"><circle cx="${hub.x}" cy="${hub.y}" r="32"></circle><text x="${hub.x}" y="${hub.y + 7}" text-anchor="middle">H</text><text class="mission-07-hub-label" x="${hub.x}" y="${hub.y + 52}" text-anchor="middle">Hub · 08:00</text></g>${nodes}`;
}

function renderSchedule(schedule) {
  return `<div class="table-wrap"><table class="data-table mission-route-schedule"><caption>Horários da rota</caption><thead><tr><th>Local</th><th>Chegada</th><th>Início</th><th>Saída</th></tr></thead><tbody>${schedule.map((row) => `<tr><th scope="row">${row.id}</th><td>${row.arrival}</td><td>${row.serviceStart}</td><td>${row.departure}</td></tr>`).join('')}</tbody></table></div>`;
}

export function mountMission07(host, context) {
  const view = createMissionShell({ mission: context.mission, ...context });
  const saved = view.saved.stageData ?? {};
  let stage = ['intro', 'briefing', 'route', 'answer', 'completed'].includes(saved.stage) ? saved.stage : 'intro';
  let route = Array.isArray(saved.route) ? saved.route.filter((id) => NODE_BY_ID.has(id)).slice(0, MISSION_07_NODES.length) : [];
  let result = validateMission07Route(route);
  if (stage === 'answer' && !result.valid) stage = 'route';

  view.content.innerHTML = `<style>${MISSION_07_STYLE}</style><div class="mission-flow mission-07-flow mission-07-visual"><div class="mission-actions"><button class="button ghost" type="button" data-reset>Reiniciar missão</button></div><section data-stage="intro" ${stage === 'intro' ? '' : 'hidden'}><div class="mission-07-brief"><p>Uma rota eficiente precisa entregar muitos pacotes antes do fechamento da doca.</p><p>Você pode escolher caminhos diferentes. O grafo mostra os custos; a melhor rota não é necessariamente a primeira que chega.</p></div><button class="button primary" type="button" data-start>Iniciar operação</button></section><section data-stage="briefing" ${stage === 'briefing' ? '' : 'hidden'}><h2>Briefing operacional</h2><p>Comece em H às 08:00 e termine em D. Estoque inicial de ${MISSION_07_TOTAL_PACKAGES} pacotes. Prazo: ${MISSION_07_BUDGET} minutos. O score prioriza o número de pacotes entregues, depois tempo e por fim quantidade de paradas.</p><div class="table-wrap"><table class="data-table"><caption>Locais disponíveis</caption><thead><tr><th>ID</th><th>Local</th><th>Letra</th><th>Pacotes</th><th>Serviço</th><th>Janela</th></tr></thead><tbody>${MISSION_07_NODES.map((node) => `<tr><th scope="row">${node.id}</th><td>${node.label}</td><td>${node.letter}</td><td>${node.packages}</td><td>${node.service} min</td><td>${formatClock(node.window[0])}–${formatClock(node.window[1])}</td></tr>`).join('')}</tbody></table></div><button class="button primary" type="button" data-plan>Explorar grafo</button></section><section data-stage="route" ${stage === 'route' ? '' : 'hidden'}><div class="mission-07-answer-head"><h2>Planejador de rota</h2><p>Escolha qualquer local conectado ainda não visitado. A Doca Final encerra o caminho.</p></div><div class="mission-07-dashboard" aria-label="Métricas atuais"><div class="mission-07-stat"><span>Pacotes entregues</span><strong><span data-packages>0</span></strong><div class="mission-07-meter" aria-hidden="true"><span data-capacity-meter></span></div></div><div class="mission-07-stat"><span>Tempo</span><strong data-clock>08:00</strong></div><div class="mission-07-stat"><span>Pacotes restantes</span><strong><span data-capacity>${MISSION_07_TOTAL_PACKAGES}</span></strong></div><div class="mission-07-stat"><span>Eficiência</span><strong data-efficiency>0,00</strong></div></div><div class="mission-07-graph-wrap"><svg class="mission-07-graph" viewBox="0 0 960 540" role="group" aria-labelledby="mission-07-graph-title mission-07-graph-description"><title id="mission-07-graph-title">Grafo da rota logística</title><desc id="mission-07-graph-description">Selecione locais na ordem da rota. Cada local mostra uma letra e uma quantidade de pacotes.</desc>${renderGraphEdges()}${renderGraphNodes()}</svg></div><p class="mission-07-route-status" data-route-status aria-live="polite"></p><ol class="mission-07-route" data-route aria-label="Locais escolhidos na ordem"></ol><div class="mission-07-actions"><button class="button ghost" type="button" data-undo disabled>Desfazer</button><button class="button ghost" type="button" data-clear disabled>Limpar</button><button class="button primary" type="button" data-confirm disabled>Finalizar em D</button></div></section><section data-stage="answer" ${stage === 'answer' ? '' : 'hidden'}><div class="mission-07-answer-head"><h2>Rota ótima encontrada</h2><p>A rota entrega o maior número de pacotes no menor tempo entre as melhores opções. Confirme o código formado pelas letras visitadas.</p></div><div data-schedule>${result.valid ? renderSchedule(result.schedule) : ''}</div><p><strong data-answer-stats>${result.valid ? `${result.packages} pacotes em ${result.elapsed} minutos · ${result.code}` : ''}</strong></p><form class="answer-form" data-form><label for="mission-07-answer">Qual código foi formado?</label><input id="mission-07-answer" name="answer" autocomplete="off" required><button class="button primary" type="submit">Validar código</button></form></section><section data-stage="completed" ${stage === 'completed' ? '' : 'hidden'}><h2>Operação concluída</h2><p>A rota vencedora foi registrada. Código confirmado: <strong>IFOOD</strong>.</p></section><div class="mission-bonus" data-bonus hidden><h2>Memória desbloqueada</h2><p>Uma entrega de comida em Rotterdam, feita para virar uma cena a dois.</p></div></div>`;

  const stages = [...view.content.querySelectorAll('[data-stage]')];
  const routeElement = view.content.querySelector('[data-route]');
  const routeStatus = view.content.querySelector('[data-route-status]');
  const clockElement = view.content.querySelector('[data-clock]');
  const packagesElement = view.content.querySelector('[data-packages]');
  const capacityElement = view.content.querySelector('[data-capacity]');
  const capacityMeter = view.content.querySelector('[data-capacity-meter]');
  const efficiencyElement = view.content.querySelector('[data-efficiency]');
  const undoButton = view.content.querySelector('[data-undo]');
  const clearButton = view.content.querySelector('[data-clear]');
  const confirmButton = view.content.querySelector('[data-confirm]');
  const nodeElements = [...view.content.querySelectorAll('[data-node-id]')];
  const edgeElements = [...view.content.querySelectorAll('[data-edge]')];
  const save = () => view.saveData({ stage, route });
  const showStage = (next) => { stage = next; stages.forEach((element) => { element.hidden = element.dataset.stage !== stage; }); save(); };

  function renderRoute() {
    const preview = evaluatePath(route);
    const packages = preview.packages ?? 0;
    const capacityUsed = preview.capacityUsed ?? 0;
    const elapsed = preview.elapsed ?? 0;
    const previous = route.at(-1) ?? 'H';
    const traveledEdges = new Set();
    let from = 'H';
    route.forEach((id) => { traveledEdges.add(edgeKey(from, id)); from = id; });
    clockElement.textContent = formatClock(elapsed);
    packagesElement.textContent = String(packages);
    capacityElement.textContent = String(preview.remainingPackages ?? MISSION_07_TOTAL_PACKAGES - packages);
    capacityMeter.style.width = `${(capacityUsed / MISSION_07_CAPACITY) * 100}%`;
    capacityMeter.classList.toggle('is-low', capacityUsed >= MISSION_07_CAPACITY - 5);
    efficiencyElement.textContent = elapsed ? `${(packages / elapsed).toFixed(2).replace('.', ',')} pac/min` : '0,00 pac/min';
    undoButton.disabled = route.length === 0;
    clearButton.disabled = route.length === 0;
    confirmButton.disabled = route.at(-1) !== 'D';
    routeElement.innerHTML = route.map((id, index) => { const node = NODE_BY_ID.get(id); const row = preview.schedule?.[index]; return `<li class="is-filled ${node.kind === 'detour' ? 'is-detour' : ''}"><strong>${index + 1}</strong><span>${node.id} — ${node.label} (${node.letter})</span><small>${row?.serviceStart ?? ''}</small></li>`; }).join('');
    routeStatus.textContent = route.at(-1) === 'D' ? 'Rota encerrada em D. Compare os resultados e finalize.' : `Próximo local após ${previous === 'H' ? 'H (Hub)' : previous}: escolha um nó conectado.`;
    nodeElements.forEach((element) => { const id = element.dataset.nodeId; const node = NODE_BY_ID.get(id); const visited = route.includes(id); const last = route.at(-1) === id; const closed = route.at(-1) === 'D'; element.dataset.state = visited ? 'visited' : 'available'; element.setAttribute('aria-disabled', visited ? (last ? 'false' : 'true') : (closed ? 'true' : 'false')); element.setAttribute('aria-label', `${node.label}. Letra ${node.letter}. ${node.packages} pacotes. ${last ? 'Último local da rota. Clique para remover.' : visited ? `Visitado na posição ${route.indexOf(id) + 1}.` : closed ? 'Rota encerrada.' : 'Disponível.'}`); });
    edgeElements.forEach((element) => { element.classList.toggle('is-traveled', traveledEdges.has(element.dataset.edge)); });
  }

  function removeLastNode() {
    if (!route.length) return;
    route = route.slice(0, -1);
    save();
    renderRoute();
    routeStatus.textContent = 'Último local removido. Escolha outro nó para explorar a rota.';
  }

  function selectNode(id) {
    if (stage !== 'route') return;
    if (route.at(-1) === id) {
      removeLastNode();
      return;
    }
    if (route.at(-1) === 'D') return;
    if (route.includes(id)) {
      routeStatus.textContent = 'Esse local já foi visitado. Use Desfazer ou Limpar para explorar outra rota.';
      return;
    }
    const next = [...route, id];
    const preview = evaluatePath(next, id === 'D');
    const warning = preview.valid
      ? ''
      : `Rota provisoriamente inviável: ${preview.reason} Desfaça ou limpe para continuar explorando.`;
    route = next;
    save();
    renderRoute();
    if (warning) routeStatus.textContent = warning;
  }

  view.content.querySelector('[data-start]').addEventListener('click', () => showStage('briefing'));
  view.content.querySelector('[data-plan]').addEventListener('click', () => showStage('route'));
  view.content.querySelector('[data-reset]').addEventListener('click', () => { context.store.clear(context.mission.id); mountMission07(host, context); });
  nodeElements.forEach((element) => { element.addEventListener('click', () => selectNode(element.dataset.nodeId)); element.addEventListener('keydown', (event) => { if (event.key !== 'Enter' && event.key !== ' ') return; event.preventDefault(); selectNode(element.dataset.nodeId); }); });
  undoButton.addEventListener('click', removeLastNode);
  clearButton.addEventListener('click', () => { if (!route.length) return; route = []; save(); renderRoute(); });
  confirmButton.addEventListener('click', () => { result = validateMission07Route(route); if (!result.valid) { routeStatus.textContent = `${result.reason} A tentativa de rota não consumiu erro; use Desfazer ou Limpar para explorar.`; return; } if (compareMission07Scores(result.score, MISSION_07_OPTIMAL.score) !== 0) { routeStatus.textContent = 'Essa rota é possível, mas não é a melhor combinação de pacotes e tempo. A tentativa de rota não consumiu erro; explore outra sequência.'; return; } showStage('answer'); view.content.querySelector('[data-schedule]').innerHTML = renderSchedule(result.schedule); view.content.querySelector('[data-answer-stats]').textContent = `${result.packages} pacotes em ${result.elapsed} minutos · ${result.code}`; });
  view.content.querySelector('[data-form]').addEventListener('submit', (event) => { event.preventDefault(); if (view.blocked) return; if (!matchesAnswer(event.currentTarget.answer.value, MISSION_07_ACCEPTED)) { view.fail('O código não corresponde à rota vencedora.'); return; } showStage('completed'); view.success('A rota vencedora entregou mais pacotes em menos tempo.'); view.content.querySelector('[data-bonus]').hidden = false; });
  if (view.saved.completed) { showStage('completed'); view.content.querySelector('[data-bonus]').hidden = false; }
  renderRoute();
  host.replaceChildren(view.root);
}
