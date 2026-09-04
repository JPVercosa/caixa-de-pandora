# Desafio 12 — Vale Japonês

## Contrato da missão

Missão isolada baseada em dois tabuleiros de SET. Cada tabuleiro contém exatamente um trio válido; os tokens revelados formam a conexão japonesa.

| Campo | Valor |
|---|---|
| Data | 2026-09-12 |
| Dificuldade | Média-alta |
| Duração | 20–30 min |
| Resposta final | `JAPONÊS` |

## Fluxo e estado

`intro → board-1 → board-2 → final → success`. Cada tabuleiro mostra 9 cartas e permite selecionar exatamente 3. Seleção inválida mantém o tabuleiro e incrementa `errors`; seleção correta bloqueia o tabuleiro, revela seus tokens e libera o próximo. A resposta final fica bloqueada até os dois tabuleiros concluírem.

Persistir `{ board1Solved, board2Solved, errors, completed }` durante a sessão; recarregar restaura e `Reiniciar` limpa. Os tokens corretos aparecem somente depois do trio correto.

## Codificação das cartas

Cada carta é `[cor][forma][preenchimento][quantidade]`, com valores 0, 1 e 2:

| Valor | Cor | Forma | Preenchimento | Quantidade |
|---:|---|---|---|---|
| 0 | verde | círculo | vazado | 1 |
| 1 | lilás | triângulo | listrado | 2 |
| 2 | dourado | onda | sólido | 3 |

Um trio é SET se, em cada uma das quatro posições, os três valores são todos iguais ou todos diferentes. A implementação deve testar todas as combinações de três IDs do tabuleiro.

## Dados fixos

### Tabuleiro 1

| ID | Código | Papel |
|---|---|---|
| A1 | `0000` | solução |
| A2 | `0001` | solução |
| A3 | `0010` | distração |
| A4 | `0100` | distração |
| A5 | `0101` | distração |
| A6 | `0110` | distração |
| A7 | `1000` | distração |
| A8 | `1001` | distração |
| A9 | `0002` | solução |

Acerto: `A1,A2,A9`; revelar na ordem visual `YU`, `KI`, `DO`.

### Tabuleiro 2

| ID | Código | Papel |
|---|---|---|
| B1 | `0000` | distração |
| B2 | `0001` | distração |
| B3 | `0010` | distração |
| B4 | `0100` | solução |
| B5 | `0101` | distração |
| B6 | `0110` | distração |
| B7 | `1000` | solução |
| B8 | `1001` | distração |
| B9 | `2200` | solução |

Acerto: `B4,B7,B9`; revelar na ordem visual `KA`, `ZU`, `MI`.

## Mecânica, validador, solução e unicidade

Tabuleiro 1: `0000,0001,0002` tem cor, forma e preenchimento iguais e quantidade `0,1,2` diferente. Tabuleiro 2: `0100,1000,2200` tem cor e forma diferentes e preenchimento/quantidade iguais. O teste de unicidade deve enumerar `C(9,3)` combinações por tabuleiro e retornar exatamente 1 SET em cada.

A leitura dos tokens é `YU KI DO KA ZU MI`, apresentada como conexão semântica com o Japão. A validação final aceita somente `JAPONÊS` após normalização NFD, remoção de acentos/pontuação/espaços externos e conversão para maiúsculas; `JAPONES` passa, palavras diferentes falham.

## Erros, ajuda e interface

Erros 1–2: mensagem neutra. No erro 3 mostrar `Em SET, cada atributo precisa ser todo igual ou todo diferente.`. No erro 7 mostrar `Há exatamente um trio válido em cada tabuleiro.`. No erro 12 esconder dicas e manter apenas `Recorrer ao criador`, sem revelar a resposta. O bônus só aparece em `success`.

Cada carta é botão acessível com código e descrição textual; seleção deve ser anunciada, não depender só de cor e ter foco visível. Suportar teclado, toque `44×44px`, rotação e `prefers-reduced-motion`; em 360px empilhar os tabuleiros sem rolagem horizontal.

## Critérios de aceite e testes obrigatórios

Testar os dois trios corretos, toda combinação inválida selecionada, seleção duplicada, menos/mais de três cartas, enumeração de unicidade, resposta com/sem acento, erros 3/7/12, recarga, reset, teclado, leitor de tela e mobile.

## Bônus

Após o acerto, exibir o epílogo fixo sobre Temakeria Ipanema, Gurumê/Japa da Quitanda e Yukido/Kazumi. É conteúdo afetivo e não participa da solução.


## Interface e acessibilidade

Cada carta deve ser um botão com código e descrição dos quatro atributos; seleção, erro e acerto são anunciados sem depender só da cor. Usar foco visível, teclado, toque `44×44px`, `prefers-reduced-motion` e layout sem rolagem horizontal em 360px.

## Assets obrigatórios

Renderizar as 18 cartas como botões com código e descrição textual dos atributos. O desenho dos símbolos pode ser CSS/SVG local, mas não pode substituir o código acessível nem alterar os quatro valores da carta.
