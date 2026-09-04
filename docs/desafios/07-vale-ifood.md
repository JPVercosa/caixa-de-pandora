# Desafio 07 — Vale iFood

## Contrato da missão

Missão isolada de otimização de rota. O jogador escolhe um caminho simples do hub `H` até `D`, entregando pacotes em locais opcionais. A rota vencedora entrega mais pacotes e, em empate, termina mais cedo. Os locais `K`, `G`, `E` e `L` são desvios reais e suas letras aparecem no código da rota, mas nenhum deles pertence à rota ótima.

| Campo | Valor |
|---|---|
| Data | 2026-09-07 |
| Dificuldade | Média-alta |
| Duração | 20–30 min |
| Pré-requisito | Hub liberado; nenhuma resposta anterior |
| Resposta final | `IFOOD` |

## Fluxo fechado

1. `intro`: exibir contexto e `Iniciar operação`.
2. `briefing`: exibir grafo, tabela de locais, estoque inicial `63`, prazo `60 min` e regra de pontuação.
3. `route`: começar em `H`; clicar em qualquer local ainda não visitado e conectado. O painel atualiza tempo, pacotes, capacidade, eficiência e letras da rota. Clicar novamente no último local adicionado remove-o da rota; isso equivale a `Desfazer`.
4. `route-complete`: a seleção de `D` encerra o caminho. O jogador confirma a rota; rotas válidas, inválidas ou inferiores permanecem editáveis por `Desfazer`/`Limpar`.
5. `answer`: somente a rota ótima libera a confirmação do código.
6. `success`: validar `IFOOD`, mostrar rota/estatísticas e liberar o bônus.

Persistir durante a sessão: `{ stage, route: string[] }` e o contador comum de erros do shell. Recarregar restaura o caminho; `Reiniciar missão` limpa tudo e retorna a `intro`. Explorar e confirmar rotas não consome erro: somente uma resposta final incorreta incrementa o contador. Mesmo após 12 erros, `Desfazer`, `Limpar` e a exploração do grafo continuam disponíveis; o bloqueio vale apenas para a resposta final.

## Dados fixos

O relógio começa em `08:00`. Cada linha tem janela em minutos relativos à saída, serviço e saldo de pacotes. O estoque inicial é de `63` pacotes; o prazo final é `60 min`.

| ID | Local | Letra | Pacotes | Serviço | Janela |
|---|---|---|---:|---:|---|
| `I` | Instituto Central | I | +12 | 4 min | 00–12 |
| `F` | Feira Norte | F | +14 | 4 min | 00–25 |
| `O1` | Oficina Sul | O | +10 | 4 min | 00–40 |
| `O2` | Ótica Leste | O | +11 | 4 min | 00–50 |
| `D` | Doca Final | D | +16 | 4 min | 00–60 |
| `K` | Kiosque do Canal | K | +8 | 8 min | 00–60 |
| `G` | Galpão da Gare | G | +10 | 8 min | 00–60 |
| `E` | Estação Leste | E | +12 | 8 min | 00–60 |
| `L` | Largo das Flores | L | +14 | 8 min | 00–60 |

A matriz é dirigida e contém os tempos em minutos. As entradas são simétricas nesta versão; a implementação ainda deve consultar a direção exata `from → to`.

| De/para | I | F | O1 | O2 | D | K | G | E | L |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `H` | 2 | 8 | 12 | 18 | 24 | 9 | 11 | 14 | 16 |
| `I` | — | 4 | 10 | 16 | 22 | 8 | 12 | 15 | 17 |
| `F` | 4 | — | 4 | 10 | 16 | 9 | 8 | 13 | 15 |
| `O1` | 10 | 4 | — | 4 | 10 | 12 | 10 | 8 | 13 |
| `O2` | 16 | 10 | 4 | — | 4 | 14 | 12 | 10 | 8 |
| `D` | 22 | 16 | 10 | 4 | — | 18 | 16 | 14 | 12 |
| `K` | 8 | 9 | 12 | 14 | 18 | — | 5 | 8 | 10 |
| `G` | 12 | 8 | 10 | 12 | 16 | 5 | — | 5 | 8 |
| `E` | 15 | 13 | 8 | 10 | 14 | 8 | 5 | — | 5 |
| `L` | 17 | 15 | 13 | 8 | 12 | 10 | 8 | 5 | — |

## Mecânica e pontuação

Uma rota é um array de IDs, sem repetir, que começa implicitamente em `H` e termina em `D`. O jogador pode encerrar sem visitar todos os locais. Ao visitar um local, calcular:

```text
arrival = previousDeparture + travel(previous, current)
serviceStart = max(arrival, windowStart[current])
require serviceStart <= windowEnd[current]
load += packages[current]
require remainingPackages >= 0
departure = serviceStart + serviceMinutes[current]
```

A rota também deve terminar até `60 min` e nunca pode ser confirmada quando `remainingPackages < 0`. O número de pacotes restantes é o estoque inicial menos o total entregue; todos os locais consomem estoque positivo. O score é comparado nesta ordem:

1. maior número de pacotes entregues (`packages`);
2. menor `elapsed` no momento da saída de `D`;
3. menor quantidade de paradas.

A enumeração de todas as rotas simples `H → D` deve encontrar pelo menos 12 rotas viáveis, incluindo rotas com `K/G/E/L`, mas exatamente uma vencedora. O dataset fixo deve ser rejeitado se houver empate no score.

O código visual é a concatenação das letras de todos os locais visitados, inclusive desvios. Assim, uma rota com `K` pode exibir `IKFOOD`; esse código nunca substitui a exigência de pontuação ótima.

## Solução determinística

A rota ótima documentada é:

```text
H → I → F → O1 → O2 → D
```

Ela entrega `63` pacotes, deixa `0` pacotes restantes e termina em `38 min` (`08:38`) e produz `IFOOD`. Rotas com `K`, `G`, `E` ou `L` podem entregar o mesmo total, mas terminam depois ou têm pior eficiência; a menor rota com desvio termina em 39 minutos. Quando o estoque restante fica negativo, a rota é inválida e não pode ser concluída. A implementação deve calcular esses fatos por enumeração, não aceitar a rota apenas por comparação com uma constante.

## Resposta, erros e ajuda

O campo final só aparece depois de a rota atingir a pontuação ótima. Normalizar com `matchesAnswer`; aceitar `IFOOD`, `iFood`, `I FOOD` e `I-FOOD`; rejeitar códigos com letras de desvios, letras extras ou resposta sem rota ótima.

- Erros de rota: apenas atualizar o status do grafo; não consumir tentativa, para permitir exploração por força bruta e lógica.
- Erros 1–2 da resposta final: mensagem neutra.
- Erro 3: `Procure uma rota que entregue mais pacotes sem estourar o prazo.`
- Erro 7: `Compare primeiro a carga entregue; depois use o tempo para desempatar.`
- Erro 12 da resposta final: bloquear novas respostas e mostrar somente `Recorrer ao criador`; não bloquear a exploração do grafo.

Uma rota viável, porém inferior, deve informar apenas que a entrega não é a melhor combinação de pacotes e tempo. Nunca revelar a rota ótima em feedback automático.

## Interface, acessibilidade e assets

Manter a abordagem visual do grafo com SVG local, linhas de conexão, nós identificados e painel textual da rota. Todos os nós devem usar a mesma cor neutra quando não visitados; a interface não pode revelar a rota ótima por cor. Cada nó deve ser botão acessível por teclado (`Enter`/espaço), ter descrição de local, pacotes e janela, e possuir foco visível. O resumo da rota deve ser texto semântico equivalente ao grafo. Em 360px, o grafo pode rolar horizontalmente, mas os controles e métricas devem permanecer utilizáveis.

## Critérios de aceite e testes

- Existem 9 destinos além de `H`, incluindo exatamente os detours `K`, `G`, `E` e `L`.
- O enumerador encontra múltiplas rotas viáveis e exatamente um score vencedor.
- A rota vencedora é `H,I,F,O1,O2,D`, com 63 pacotes entregues e 0 restantes, em 38 minutos e código `IFOOD`.
- Rotas com desvios exibem suas letras, mas nunca vencem o desempate de tempo.
- Rotas incompletas, repetidas, sem aresta, fora da janela, acima da capacidade ou do prazo falham.
- Undo, limpar, persistência, reset, exploração sem consumir tentativas, dicas 3/7/12, teclado, leitor de tela e mobile funcionam.
- O bônus aparece somente após a resposta final correta.

## Bônus

Após o sucesso, exibir o epílogo fixo sobre uma entrega de comida em Rotterdam. Ele é narrativo e não participa do score, da validação ou de outras missões.
