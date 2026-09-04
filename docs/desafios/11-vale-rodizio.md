# Desafio 11 — Vale Rodízio

## Contrato da missão

Missão isolada de ordenação modular. A resposta é derivada dos tempos de chegada de sete marcadores em um disco em rotação.

| Campo | Valor |
|---|---|
| Data | 2026-09-11 |
| Dificuldade | Alta |
| Duração | 15–25 min |
| Resposta | `RODÍZIO` |

## Fluxo fechado

## Dados fixos

`intro → calculation → answer → success`. A introdução mostra o disco estático, a janela e a fórmula; a tela de cálculo mostra tabela dos marcadores; a resposta só é validada depois que a tabela estiver disponível. Persistir `{ errors, completed }` na sessão; reset limpa e recarga restaura.

- Janela: `θw = 5π/6`.
- Velocidade: `ω = π/12 rad/min`.
- Sentido: anti-horário.
- Fórmula: `Δθ = (θw − θ0) mod 2π`, depois `t = Δθ / ω`.

| ID | Letra | `θ0` | `Δθ` | `t` |
|---|---|---:|---:|---:|
| R | R | `2π/3` | `π/6` | 2 min |
| O1 | O | `π/2` | `π/3` | 4 min |
| D | D | `π/3` | `π/2` | 6 min |
| A | Í | `0` | `5π/6` | 10 min |
| Z | Z | `3π/2` | `4π/3` | 16 min |
| I | I | `4π/3` | `3π/2` | 18 min |
| O2 | O | `7π/6` | `5π/3` | 20 min |

`O1` e `O2` são IDs distintos; a letra exibida é `O`. Usar frações/racionais ou valores inteiros de doze-avos, nunca arredondamento para decidir ordem.

## Mecânica, validador e solução

Calcular todos os sete tempos, ordenar por `(time, originalIndex)` apenas como proteção contra empate, e rejeitar se houver empate real. A ordem única é `R, O1, D, A, Z, I, O2`; as letras formam `RODÍZIO`. A enumeração deve confirmar sete tempos distintos e uma única ordenação. A entrada final não precisa reproduzir IDs, somente a palavra.

Normalizar Unicode NFD, remover acentos, pontuação, hífens e espaços externos, converter para maiúsculas; aceitar `RODÍZIO`, `RODIZIO`, `rodizio`; rejeitar ordem parcial, vírgulas, valores absolutos de ângulo ou qualquer palavra diferente.

## Erros, acessibilidade e casos

- erros 1–2: mensagem neutra;
- erro 3: `Converta a diferença angular em tempo antes de ordenar as letras.`;
- erro 7: `Os tempos são distintos; o menor tempo define a primeira letra.`;
- erro 12: esconder entrada e deixar somente `Recorrer ao criador`.

O diagrama precisa ter equivalente textual, foco visível, controles `44×44px`, suporte a teclado e modo `prefers-reduced-motion`; cor não pode ser o único sinal. Em 360px empilhar painel e tabela sem rolagem horizontal. Testar cada cálculo da tabela, variante sem acento, ordem errada, empate artificial, recarga/reset, limites de erro e bônus.

## Bônus

Após o sucesso, mostrar o bloco decorativo `Voltar ao Rio Brasa Lagoa`; não usar como pista ou estado de outra missão.


## Critérios de aceite e testes

- Os sete cálculos reproduzem exatamente 2, 4, 6, 10, 16, 18 e 20 minutos.
- A ordenação única produz `RODÍZIO`; empate artificial é rejeitado de modo determinístico.
- `RODIZIO` passa após normalização; outras ordens e palavras falham.
- Testar erros 3/7/12, recarga, reset, teclado, movimento reduzido, leitor de tela e viewport 360px.

## Assets obrigatórios

Usar diagrama/SVG local do disco, janela e sete marcadores, sempre acompanhado da tabela textual. A animação é decorativa; o cálculo e a validação devem funcionar sem mídia ou movimento.
