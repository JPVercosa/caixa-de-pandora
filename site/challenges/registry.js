import { CONSTANTS } from '../config/constants.js';
import { mountMission01 } from './mission-01.js';
import { mountMission03 } from './mission-03.js';
import { mountMission05 } from './mission-05.js';

const future = (id, title) => ({
  id,
  unlockAt: CONSTANTS.releaseDates[id],
  title,
  kicker: 'ENTREGA SELADA',
  subtitle: 'Esta missão ainda não está disponível.',
  implemented: false
});

export const MISSIONS = Object.freeze([
  { id: 1, unlockAt: CONSTANTS.releaseDates[1], title: 'Auditoria do inventário', kicker: 'REGISTRO 01', subtitle: 'Classifique o conjunto sem atribuir nomes ao que ainda não foi entregue.', implemented: true, mount: mountMission01, hints: ['Elimine as classes que violam pelo menos uma regra.', 'Compare participação, encerramento após o uso e o que permanece depois.'] },
  { id: 3, unlockAt: CONSTANTS.releaseDates[3], title: 'Manifesto poliglota', kicker: 'REGISTRO 03', subtitle: 'Quatro definições, quatro idiomas e quatro letras.', implemented: true, mount: mountMission03, hints: ['Responda corretamente cada definição apresentada.', 'O valor no índice inicial de cada resposta forma a palavra final se combinados na ordem correta.'] },
  { id: 5, unlockAt: CONSTANTS.releaseDates[5], title: 'Quatro línguas, quatro grades', kicker: 'REGISTRO 05', subtitle: 'Resolva os quadros e descubra a palavra que falta ao inventário.', implemented: true, mount: mountMission05, hints: ['Use o padrão verde/amarelo/cinza como no Termo.', 'Os índices aparecem apenas depois das quatro palavras corretas.'] },
  future(7, 'Operação última milha'),
  future(9, 'Três atlas, uma fuga'),
  future(10, 'Programação VOSTFR'),
  future(11, 'Janela de serviço'),
  future(12, 'Dois conjuntos'),
  future(13, 'O cofre dourado'),
  future(14, 'A porta e as quatro línguas'),
  future(15, 'Última milha')
]);

export function getMission(id) {
  return MISSIONS.find((mission) => mission.id === Number(id));
}
