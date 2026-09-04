# Desafio 09 — Vale-Praia

## Contrato da missão

Missão isolada de leitura de três atlas. A ideia é identificar Brasil, Grécia e Croácia e deduzir a experiência comum `PRAIA`; nenhum conhecimento de outro voucher é permitido.

| Campo | Valor |
|---|---|
| Data | 2026-09-09 |
| Dificuldade | Média |
| Duração | 15–20 min |
| Resposta | `PRAIA` |

## Fluxo e estado

Estados obrigatórios: `intro → atlas-1 → atlas-2 → atlas-3 → synthesis → success`. Cada atlas começa com seis fragmentos cobertos; dois são visíveis ao entrar e um fragmento é revelado depois de cada erro daquele atlas. A resposta intermediária correta libera o mapa/texto daquele atlas e o próximo estado. Não é permitido pular atlas nem validar a resposta final antes de `synthesis`.

Persistir na sessão `{ step, revealed: [number,number,number], intermediate: string[], errors, completed }`; restaurar ao recarregar e limpar com `Reiniciar`. Erro intermediário ou final incrementa o mesmo contador; acerto não incrementa.

## Dados fixos exibidos

| Atlas | Resposta canônica | Evidências após acerto | Ordem |
|---|---|---|---:|
| 1 | `BRASIL` | Rio, litoral, calor, mar | 1 |
| 2 | `GRÉCIA` | ilhas, costa, mar, viagem de aniversário | 2 |
| 3 | `CROÁCIA` | Dubrovnik, litoral Adriático, costa | 3 |

Os fragmentos são ornamentais e devem ter texto alternativo: Brasil revela círculo azul, fundo verde, losango/faixa/estrelas; Grécia revela faixas azul/branco e cruz; Croácia revela escudo quadriculado e faixas vermelho/branco/azul. Não usar imagens externas, geolocalização ou clima em tempo real.

A interface mostra os dados textuais acima somente depois do país correto. O resumo de síntese diz apenas que os três cartões apontam para uma experiência comum de litoral; não mostrar a palavra-alvo antes do envio.

## Validação

Cada atlas usa banco fechado de respostas:

- Brasil: `BRASIL`, `BRAZIL`, `BRÉSIL`;
- Grécia: `GRÉCIA`, `GRECIA`, `GREECE`, `GRÈCE`;
- Croácia: `CROÁCIA`, `CROACIA`, `CROATIA`, `CROATIE`.

Normalizar NFD, remover acentos, pontuação e espaços externos, converter para maiúsculas e comparar com o conjunto do atlas. Rejeitar país/cidade diferente. A resposta final normaliza artigo inicial `A` isolado, acentos, pontuação final e espaços; `PRAIA`, `praia` e `a praia` passam; `MAR`, `PRAIAS`, `RIO`, `DUBROVNIK` e países falham.

## Solução determinística

A ordem é fixa: Brasil → Grécia → Croácia. Depois de resolver os três atlas, a interseção semântica mostrada na tela é litoral + calor + fuga do inverno, cuja única resposta canônica definida pelo jogo é `PRAIA`. O teste de unicidade deve enumerar a lista de respostas finais permitidas e confirmar que somente a forma normalizada `PRAIA` passa.

## Erros e dicas

- 1–2: erro neutro, sem novo fato.
- 3: `Procure o elemento comum nos três cartões: litoral, calor e fuga do inverno.`
- 7: `O alvo não é o país, a cidade nem a ilha. É a experiência de ir ao mar.`
- 12: esconder dicas, bloquear novos envios e mostrar somente `Recorrer ao criador`.

O bônus `Memória de sol merecida` aparece apenas em `success` e não altera estado futuro.

## Interface e acessibilidade

Bandeiras/mapas precisam de `alt` equivalente, texto visível, foco, contraste e controles de `44×44px`; nenhum significado pode depender só da cor. Em 360px os cartões empilham e o campo final continua visível. Testar cada variante intermediária, país errado, ordem errada, recarga, reset, erros 3/7/12, resposta final e ausência de imagens.


## Critérios de aceite e testes

- Os estados só avançam na ordem `intro → atlas-1 → atlas-2 → atlas-3 → synthesis → success`.
- Cada atlas aceita somente seu banco fechado; a resposta final aceita somente `PRAIA` após normalização.
- Erros 3, 7 e 12 têm exatamente os comportamentos documentados.
- Recarga restaura progresso e `Reiniciar` limpa a missão.
- Testar ordem, países/cidades errados, variantes linguísticas, teclado, leitor de tela e viewport 360px.

## Bônus

Após o sucesso, mostrar `Memória de sol merecida`. É um epílogo decorativo e não participa da solução.

## Assets obrigatórios

Cada atlas precisa de um painel de fragmentos com fallback textual, marcador de mapa e resumo costeiro. Bandeiras/mapas podem ser SVGs locais; se um asset falhar, o texto e os dados desta especificação devem manter a missão resolvível.
