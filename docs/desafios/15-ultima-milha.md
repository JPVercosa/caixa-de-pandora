# Desafio 15 — Última milha

## Contrato da missão

Encerramento físico da trilha. O jogador identifica o receptáculo postal e depois a face interna exata onde a carta foi colocada. A resposta final exige os dois componentes.

| Campo | Valor |
|---|---|
| Data | 2026-09-15 |
| Dificuldade | Alta |
| Duração | 20–30 min |
| Resposta final | `CAIXA DE CORREIOS / LATERAL INTERNA DIREITA` |

## Fluxo fechado

`intro → receptacle → orientation → answer → success`. A tela inicial mostra o contexto; `receptacle` mostra o grafo e pede selecionar o destino; somente `CAIXA DE CORREIOS` libera `orientation`. A orientação mostra o diagrama e pede selecionar a face; somente `LATERAL INTERNA DIREITA` libera o campo final. O campo final valida a combinação dos dois valores, não apenas um deles.

Persistir `{ receptacle, face, errors, completed }` durante a sessão; recarregar restaura e `Reiniciar` limpa. Erros em qualquer etapa compartilham o contador.

## Dados postais e grafo

Exibir literalmente: `Rue Léopold Bellan`, `prédio 16`, `apartamento 12`, `código 35A86`. O grafo é:

```text
Centro postal → Rue Léopold Bellan → Prédio 16 → código 35A86 → hall comum
                                                             ├─ recepção
                                                             ├─ elevador → porta do apto. 12
                                                             └─ banco de receptáculos → DESTINO
```

Regras: é correspondência comum; o entregador só entra em área comum; o destinatário não precisa estar presente; o destino é associado ao apartamento 12; recepção, elevador e porta privada não armazenam correspondência; `35A86` identifica a entrada, não o receptáculo. O único destino válido é `CAIXA DE CORREIOS` (também exibir `BOÎTE AUX LETTRES` como tradução, nunca como outro receptáculo).

## Orientação espacial

O observador está diante da abertura, olhando para dentro. Direita/esquerda são sempre do observador. A carta está em superfície vertical, perpendicular ao fundo, interna e com coordenada `x > 0`.

| Face | Coordenada/orientação | Válida |
|---|---|---|
| topo | horizontal, `y > 0` | não |
| base | horizontal, `y < 0` | não |
| fundo | vertical paralela à abertura, `z < 0` | não |
| lateral interna esquerda | perpendicular, `x < 0` | não |
| lateral interna direita | perpendicular, `x > 0` | sim |

O diagrama precisa conter texto equivalente à tabela; não depender de perspectiva ou cor.

## Validação e resposta

Após ambas as etapas, aceitar somente uma intenção que contenha receptáculo `CAIXA DE CORREIOS` ou `BOITE AUX LETTRES` **e** face `LATERAL INTERNA DIREITA`. Normalizar NFD, caixa alta, acentos, barras, hífens e espaços duplicados. Aceitar `CAIXA DE CORREIOS — LATERAL INTERNA DIREITA` e `BOÎTE AUX LETTRES / LATERAL INTERNA DIREITA`; rejeitar `DIREITA`, `LATERAL DIREITA`, `PORTA`, `FUNDO`, `CAIXA DE CORREIOS` isolado ou qualquer face externa.

## Erros, dicas e interface

- erros 1–2: erro genérico;
- erro 3: `Releia o endereço como um caminho de entrega: primeiro o local, depois o ponto final.`;
- erro 7: `Você já identificou o recipiente. Agora use o ponto de vista de quem olha para dentro.`;
- erro 12: somente `Recorrer ao criador`, sem resposta automática.

Usar controles acessíveis, foco visível, descrição textual do grafo/diagrama, toque `44×44px`, teclado e `prefers-reduced-motion`. Em 360px empilhar grafo, diagrama e resposta.

## Unicidade, critérios de aceite e testes

O grafo deve ter exatamente um ramo de receptáculo; a tabela deve deixar exatamente uma face válida. Testar cada ramo incorreto, orientação externa, respostas parciais, variantes PT/FR, caracteres extras, recarga/reset, erros 3/7/12, mobile, teclado e leitor de tela. O bônus só aparece em `success`.

## Bônus

Após sucesso, mostrar uma mensagem final de aniversário. É celebrativa, não operacional e não é usada por nenhuma missão futura.


## Interface e acessibilidade

O grafo e o diagrama devem ter descrição textual equivalente, foco visível, controles `44×44px`, teclado e nenhum significado dependente exclusivamente de cor. Em 360px, empilhar as etapas sem ocultar a resposta.

## Critérios de aceite e testes

- O grafo tem um único ramo de receptáculo e a tabela tem uma única face válida.
- Respostas parciais (`CAIXA DE CORREIOS`, `DIREITA`) não concluem; a combinação completa conclui após normalização.
- Testar orientação externa, face errada, variantes PT/FR, caracteres extras, recarga, reset, erros 3/7/12, teclado, leitor de tela e mobile.

## Assets obrigatórios

Usar cartão postal, grafo e diagrama local da caixa aberta, sempre com a tabela textual equivalente. O desenho não pode ser a única forma de comunicar orientação ou localização.
