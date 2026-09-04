# Desafio 14 — Artefato-Carta

## Contrato da missão

Missão isolada em duas travas: converter um código de porta e extrair uma palavra de cinco definições multilíngues. A resposta é `CARTA`.

| Campo | Valor |
|---|---|
| Data | 2026-09-14 |
| Dificuldade | Alta |
| Duração | 25–35 min |
| Resposta | `CARTA` |

## Fluxo e estado

`intro → door-code → extraction → success`. Em `door-code`, o jogador confirma a conversão `35A86 → 35186`; somente então `extraction` é liberada. Em cada uma das cinco faixas, selecionar exatamente uma opção; só depois de todas corretas mostrar os caracteres indexados e liberar a resposta final. Persistir `{ stage, doorConfirmed, selections, errors, completed }`; reset limpa e recarga restaura.

## Código e dados fixos

A conversão é literal: substituir a única letra `A` por `1`, preservando os demais caracteres. O código de referência interno passa a ser `35186`; não aceitar `35186` como resposta final.

Os índices são **one-based**, na ordem das faixas PT, EN, FR, ES, PT. Para indexar, primeiro converter a resposta para maiúsculas, remover espaços e acentos; a contagem é feita sobre a string resultante.

| # | Definição | Opções | Correta | Forma indexada | Índice | Letra |
|---:|---|---|---|---|---:|---|
| 1 PT | Uma lembrança faz isto quando volta à mente. | `RECORDA`, `ESQUECE`, `APAGA`, `CALA` | RECORDA | RECORDA | 3 | C |
| 2 EN | Beyond what was expected. | `EXTRA`, `LESS`, `PLAIN`, `EARLY` | EXTRA | EXTRA | 5 | A |
| 3 FR | Action de revenir au point de départ. | `RETOUR`, `DÉPART`, `OUBLI`, `ARRÊT` | RETOUR | RETOUR | 1 | R |
| 4 ES | Expresión de regresar hacia la persona amada. | `VOLVER A TI`, `IRME DE AQUÍ`, `MIRAR ATRÁS`, `QUEDAR LEJOS` | VOLVER A TI | VOLVERATI | 8 | T |
| 5 PT | Aquilo que a distância exige quando ainda não é hora. | `ESPERA`, `PRESSA`, `FUGA`, `ESQUECIMENTO` | ESPERA | ESPERA | 6 | A |

A extração é `RECORDA[3] + EXTRA[5] + RETOUR[1] + VOLVERATI[8] + ESPERA[6] = CARTA`.

## Regras de validação

O código da porta é uma confirmação intermediária, não a resposta. Faixas fora de ordem, opções não listadas e extrações com índice zero-based falham. A resposta final normaliza NFD, remove acentos, pontuação e espaços externos, converte para maiúsculas e aceita somente `CARTA`.

## Erros, dicas e interface

Erros 1–2: mensagem neutra. Erro 3: `Converta o código da porta antes de usar os índices.`. Erro 7: `Resolva as definições; na faixa espanhola, remova os espaços antes de contar a oitava letra.`. Erro 12: esconder tentativa e deixar somente `Recorrer ao criador`; nunca revelar a palavra.

Faixas devem ter rótulo de idioma, opções acessíveis, foco, suporte a teclado/toque `44×44px`, texto alternativo para índice e nenhum significado baseado só em cor. Em telas estreitas, empilhar faixas e manter o campo final visível.

## Unicidade, critérios de aceite e testes

Cada faixa tem banco fechado e uma única opção que satisfaz sua definição; o teste deve confirmar uma solução por faixa e a sequência final `CARTA`. Testar conversão `35A86`, tentativa final `35186`, cada opção errada, índice 1/5/8, resposta sem acento, recarga/reset, erros 3/7/12, navegador em qualquer idioma e viewport 360px.

## Bônus

Depois do sucesso, mostrar a linha do tempo afetiva fixa. É apenas epílogo e não participa da validação.


## Interface e acessibilidade

Exibir a conversão do código e o índice selecionado em texto e marcação semântica; não depender de cor. As faixas devem ser navegáveis por teclado, ter foco visível, controles `44×44px`, labels de idioma e layout empilhável em 360px.

## Critérios de aceite e testes

- `35A86` converte para `35186`, mas somente `CARTA` conclui.
- Cada uma das cinco faixas tem uma solução; índices one-based produzem `CARTA`.
- Testar opções erradas, zero-based, recarga, reset, normalização, erros 3/7/12, idiomas do navegador e mobile.

## Assets obrigatórios

Usar cartão local da porta, código textual `35A86`, cinco faixas linguísticas e marcação textual do índice. Nenhuma imagem, fonte ou serviço externo participa da solução.
