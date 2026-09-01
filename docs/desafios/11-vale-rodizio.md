# Desafio 11 — Vale Rodízio

Especificação fechada da missão. Este documento é autossuficiente: ele não depende de respostas de outros vales, não reutiliza ganchos externos e não deve expor qualquer outra solução do projeto.

## Metadados

| Campo | Valor |
|---|---|
| Data | 2026-09-11 |
| Sequência | 11 |
| Resposta revelada | RODÍZIO |
| Dificuldade | Alta |
| Duração esperada | 15 a 25 minutos |
| Pré-requisito | Saber ler radianos, aplicar módulo `2π` e ordenar tempos de chegada |

## Propósito narrativo e regra de isolamento

A missão representa a leitura técnica de um sistema mecânico em rotação contínua. O jogador atua como o engenheiro que precisa descobrir a ordem correta dos marcadores ao longo da janela de serviço.

Regra de isolamento: esta missão não deve mencionar, inferir ou reutilizar qualquer resposta de outro voucher. O único resultado válido desta tela é a palavra **RODÍZIO**, obtida a partir dos dados desta missão apenas.

## Fluxo exato do jogador

1. **Tela inicial**
   - Título neutro: `Janela de serviço`.
   - Subtítulo: `Leia o disco em rotação e ordene os marcadores pela chegada à janela de serviço.`
   - Um painel visual mostra:
     - um disco circular;
     - uma janela de serviço fixa;
     - sete marcadores identificados por letras;
     - um texto curto com a velocidade angular e a regra de módulo `2π`.
   - Botão principal: `Resolver`.

2. **Tela de tentativa**
   - Campo de resposta única.
   - Dica persistente: `A resposta é a palavra formada pela ordem de chegada dos marcadores.`
   - Botão: `Confirmar`.

3. **Estado de erro**
   - Mensagem curta: `Sequência incorreta. Recalcule a ordem angular.`
   - O contador de tentativas é compartilhado por toda a missão.

4. **Estado de sucesso**
   - Confirmação visual: `Vale desbloqueado.`
   - A palavra correta é mostrada apenas como confirmação final, não como pista de tentativa.
   - Em seguida aparece o bônus emocional opcional: `Voltar ao Rio Brasa Lagoa`.

## Recursos e dados obrigatórios

### Recursos visuais

- Ilustração ou SVG de um disco circular rotativo.
- Janela de serviço fixa, destacada por contraste alto.
- Sete marcadores visuais com rótulos de letra.
- Versão estática do diagrama para usuários com movimento reduzido.

### Dados fixos da missão

- Centro da janela de serviço: `θw = 5π/6`.
- Velocidade angular: `ω = π/12 rad/min`.
- Sentido de rotação: anti-horário.
- Regra de leitura: o marcador entra em serviço quando seu centro atinge `θw` após avançar em módulo `2π`.

### Marcadores

Use os sete marcadores abaixo. Os dois marcadores `O` são itens distintos e precisam permanecer assim no texto e na validação.

| Letra | Ângulo inicial `θ0` | Diferença até a janela `Δθ = (θw - θ0) mod 2π` | Tempo de chegada `t = Δθ / ω` |
|---|---:|---:|---:|
| R | `2π/3` | `π/6` | `2 min` |
| O₁ | `π/2` | `π/3` | `4 min` |
| D | `π/3` | `π/2` | `6 min` |
| Í | `0` | `5π/6` | `10 min` |
| Z | `3π/2` | `4π/3` | `16 min` |
| I | `4π/3` | `3π/2` | `18 min` |
| O₂ | `7π/6` | `5π/3` | `20 min` |

## Mecânica detalhada

O jogador vê os sete marcadores e precisa ordenar as letras pelo instante em que cada uma alcança a janela de serviço.

O cálculo é sempre:

1. calcular a diferença angular positiva com módulo `2π`;
2. dividir por `ω`;
3. ordenar os tempos do menor para o maior;
4. concatenar as letras nessa ordem.

Como todos os tempos são distintos, não existe empate e a solução é única.

## Solução completa para o implementador

### 1) Calcular o avanço restante

Com `θw = 5π/6` e `ω = π/12`, a diferença de cada marcador é:

- `R`: `(5π/6 - 2π/3) mod 2π = π/6`
- `O₁`: `(5π/6 - π/2) mod 2π = π/3`
- `D`: `(5π/6 - π/3) mod 2π = π/2`
- `Í`: `(5π/6 - 0) mod 2π = 5π/6`
- `Z`: `(5π/6 - 3π/2) mod 2π = 4π/3`
- `I`: `(5π/6 - 4π/3) mod 2π = 3π/2`
- `O₂`: `(5π/6 - 7π/6) mod 2π = 5π/3`

### 2) Converter para tempo

Dividindo cada diferença por `ω = π/12`:

- `R`: `(π/6) / (π/12) = 2`
- `O₁`: `(π/3) / (π/12) = 4`
- `D`: `(π/2) / (π/12) = 6`
- `Í`: `(5π/6) / (π/12) = 10`
- `Z`: `(4π/3) / (π/12) = 16`
- `I`: `(3π/2) / (π/12) = 18`
- `O₂`: `(5π/3) / (π/12) = 20`

### 3) Ordenar

Ordem de chegada:

1. `R`
2. `O₁`
3. `D`
4. `Í`
5. `Z`
6. `I`
7. `O₂`

### 4) Formar a resposta

Concatenando as letras, o resultado é:

**RODÍZIO**

## Variantes aceitas e normalização

### Formas aceitas

- `RODÍZIO`
- `rodízio`
- `Rodízio`
- `RODIZIO`
- `rodizio`

### Normalização

Antes de comparar:

1. remover espaços nas extremidades;
2. remover hífens, pontos e pontuação final;
3. normalizar Unicode;
4. remover acentos;
5. converter para maiúsculas.

Depois da normalização, toda variante acima vira `RODIZIO`.

## Comportamento das tentativas

O contador é por missão e aumenta a cada envio incorreto.

- **Após 1 a 2 erros**
  - Mostrar apenas a mensagem genérica de erro.

- **Após 3 erros**
  - Mostrar a primeira dica:
    - `Converta a diferença angular em tempo antes de ordenar as letras.`

- **Após 7 erros**
  - Mostrar uma dica mais forte:
    - `Os tempos são todos distintos; o menor tempo define a primeira letra da resposta.`

- **Após 12 erros**
  - Esconder o campo de resposta.
  - Mostrar apenas a ação `Recorrer ao criador`.
  - Não revelar a palavra correta.

## Bônus emocional desbloqueado

- **Bônus**: `Voltar ao Rio Brasa Lagoa`.
- Esse bônus é apenas afetivo, aparece depois da conclusão e não é usado em nenhuma etapa seguinte.

## Notas de implementação

- Use frações exatas para evitar erro de ponto flutuante.
- Se houver animação, ela deve ser apenas decorativa; a validação deve depender dos dados fixos da tabela.
- O modo com movimento reduzido deve trocar a animação por um diagrama estático com o mesmo conjunto de ângulos.
- Não destaque a resposta com cores isoladas; preserve legibilidade para daltonismo.
- Os dois marcadores `O` precisam ser tratados como entidades distintas no estado interno.

## Acessibilidade

- Todos os elementos clicáveis devem ter área mínima de toque de `44 x 44 px`.
- O disco e a janela de serviço devem ter rótulos acessíveis.
- O estado de foco deve ser visível em teclado e em leitor de tela.
- O conteúdo matemático deve ser legível em texto alternativo ou tabela.
- A missão não pode depender de cor para diferenciar marcadores.

## Casos-limite

- Aceitar ângulos equivalentes com `+2πk` apenas na camada interna, nunca no texto do jogador.
- Não permitir respostas múltiplas separadas por vírgula.
- Não confundir os dois marcadores `O`; eles têm tempos distintos e letras iguais por design.
- Não aceitar ordenação por valores absolutos de ângulo sem o módulo.
- Em telas muito estreitas, o painel deve empilhar verticalmente sem rolagem horizontal.

## Critérios de aceite

- A única palavra correta é `RODÍZIO`.
- O cálculo modular produz exatamente a ordem `R, O, D, Í, Z, I, O`.
- Não existe empate entre tempos de chegada.
- As dicas aparecem exatamente após 3, 7 e 12 erros.
- O bônus emocional aparece somente após sucesso e não altera validação nenhuma.
- A experiência funciona bem em celular sem rolagem horizontal.

## Cenários de teste

| Cenário | Entrada / ação | Resultado esperado |
|---|---|---|
| Solução nominal | Submeter `RODÍZIO` | Sucesso imediato |
| Variante sem acento | Submeter `rodizio` | Sucesso após normalização |
| Ordem errada | Submeter `RDOÍZIO` | Rejeição |
| Dica 1 | Errar 3 vezes | Exibir dica de conversão angular |
| Dica 2 | Errar 7 vezes | Exibir dica forte sobre ordenação por tempo |
| Bloqueio final | Errar 12 vezes | Exibir apenas `Recorrer ao criador` |
| Mobile | Abrir em 360 x 640 | Sem corte do disco, sem rolagem horizontal, toque confortável |
| Acessibilidade | Navegar só com teclado | Todas as ações ficam acessíveis e o foco é visível |
