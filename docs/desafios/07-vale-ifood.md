# Desafio 07 — Vale iFood

## Contrato da missão

Especificação autoritativa do voucher 07. A missão é isolada: nenhum texto, resposta ou dado de outro voucher pode ser usado. O objetivo é montar uma rota única de entrega e ler `IFOOD` das paradas.

| Campo | Valor |
|---|---|
| Data | 2026-09-07 |
| Dificuldade | Média |
| Duração | 15–20 min |
| Pré-requisito | Hub liberado; não exige resposta anterior |
| Resposta final | `IFOOD` |

## Fluxo fechado

1. `intro`: exibir título `Operação última milha`, contexto curto e `Iniciar`.
2. `briefing`: exibir horário de saída, duração do serviço, capacidade, tabela de nós, matriz de deslocamento e regras.
3. `route`: exibir cinco slots numerados e cinco paradas selecionáveis. A mesma parada não pode ocupar dois slots.
4. `route-error`: ao confirmar uma rota incompleta ou inválida, manter o rascunho, incrementar `errors` e anunciar um motivo genérico.
5. `route-success`: ao confirmar a única rota válida, mostrar a ordem aceita e liberar a resposta `IFOOD` como confirmação.
6. `bonus`: mostrar o bônus somente após o sucesso. `Recorrer ao criador` substitui dicas a partir de 12 erros e nunca revela a rota.

Persistir durante a sessão: `{ route: string[], errors: number, completed: boolean }`. `Reiniciar` limpa tudo e volta a `intro`; recarregar restaura o estado.

## Dados fixos

- Saída do hub: `08:00`.
- Serviço em cada parada: `4 min`.
- Capacidade: `9` unidades; demandas somam `9`.
- Regra de chegada: `arrival = previousDeparture + travel`; `serviceStart = max(arrival, windowStart)`; rejeitar se `serviceStart > windowEnd`.
- A matriz é dirigida; célula `—` ou `bloqueado` torna o trecho inválido.

| ID | Parada | Letra | Demanda | Janela |
|---|---|---|---:|---|
| `I` | Instituto Central | I | 1 | 08:00–08:08 |
| `F` | Feira Norte | F | 2 | 08:12–08:22 |
| `O1` | Oficina Sul | O | 2 | 08:27–08:37 |
| `O2` | Ótica Leste | O | 1 | 08:42–08:52 |
| `D` | Doca Final | D | 3 | 08:57–09:07 |

| De/para | I | F | O1 | O2 | D |
|---|---:|---:|---:|---:|---:|
| Hub | 2 | 5 | 8 | 12 | 16 |
| I | — | 4 | bloqueado | 6 | 10 |
| F | 4 | — | 4 | 6 | 10 |
| O1 | 8 | 4 | — | 4 | 7 |
| O2 | 12 | 6 | 4 | — | 4 |
| D | 16 | 10 | 7 | 4 | — |

Incompatibilidade adicional: `O1` e `D` não podem ser adjacentes. `O1` e `O2` são entidades distintas apesar de compartilharem a letra `O`.

## Mecânica e validador

A confirmação só é processada com exatamente cinco IDs distintos. O validador deve:

1. rejeitar IDs desconhecidos, duplicados ou rota incompleta;
2. rejeitar qualquer aresta inexistente ou `I → O1`;
3. rejeitar adjacência `O1/D` em qualquer direção;
4. iniciar o relógio em `08:00` e demanda em `0`;
5. para cada nó, calcular chegada, esperar até a abertura da janela, validar o fechamento e somar demanda;
6. aceitar somente se todos os nós forem visitados e a demanda não exceder `9`;
7. formar a confirmação concatenando as letras na ordem aceita.

Pseudoalgoritmo:

```text
for route in candidate:
  require route == [I,F,O1,O2,D] length-wise (permutation check)
  require every edge exists and no O1/D adjacency
  time = 08:00; load = 0
  for node in route:
    time += travel(previous, node)
    start = max(time, windowStart[node])
    require start <= windowEnd[node]
    load += demand[node]
    require load <= 9
    time = start + 4 minutes
accept route; code = letters(route)
```

## Solução e unicidade

A rota única é `I → F → O1 → O2 → D`. Chegadas/inícios/saídas: `I 08:02/08:02/08:06`, `F 08:10/08:12/08:16`, `O1 08:20/08:27/08:31`, `O2 08:35/08:42/08:46`, `D 08:50/08:57/09:01`. A enumeração das `5!` permutações deve encontrar exatamente uma rota aceita. O código das letras é `IFOOD`.

## Resposta final

Resposta canônica: `IFOOD`. Normalizar Unicode NFD, remover acentos, converter para maiúsculas, remover espaços, hífens e pontuação; aceitar `iFood`, `I FOOD` e `I-FOOD`; rejeitar qualquer letra extra.

- Erros 1–2: mensagem neutra.
- Erro 3: `Procure a primeira parada que ainda permite cumprir as janelas seguintes.`
- Erro 7: `A rota correta respeita as janelas em ordem; não confunda os dois nós O.`
- Erro 12: esconder dicas e desabilitar novas submissões, deixando apenas `Recorrer ao criador`.

## Erros e dicas

Nenhuma dica pode revelar a rota completa ou `IFOOD` antes do acerto.

## Interface, acessibilidade e casos-limite

Usar tabela semântica, slots com foco visível, seleção por teclado e botões com pelo menos `44×44px`. Não depender somente de cor; anunciar erros, progresso e rota aceita via `aria-live`. Em 360px, empilhar controles; permitir rolagem horizontal apenas na matriz. Rota parcial, duplicada, janela perdida, trecho bloqueado, reset e recarga são testes obrigatórios.

## Critérios de aceite e testes

- Enumeração encontra exatamente uma rota: `I,F,O1,O2,D`.
- `I → O1`, `F → O2 → O1` quando quebra janela, e qualquer rota com `O1/D` adjacente falham sem alterar o rascunho.
- `IFOOD`, `iFood` e `I-FOOD` passam; palavras semelhantes falham.
- Dicas aparecem exatamente nos erros 3 e 7; após 12 somente o botão de recurso permanece.
- Recarregar restaura rota/erros; reiniciar limpa; bônus só aparece após sucesso.
- Testar teclado, leitor de tela e viewport 360px.

## Bônus

Após o sucesso, mostrar apenas o epílogo fixo sobre a cena de uma entrega de comida em Rotterdam. O bônus é narrativo e não participa da validação nem de missões futuras.

## Assets obrigatórios

Usar mapa estático do circuito, tabela semântica da matriz, cinco cartões/botões de parada, cinco slots numerados, estados textualizados de rota válida/inválida e bloco de bônus. Nenhum asset visual é necessário para calcular ou validar a rota.
