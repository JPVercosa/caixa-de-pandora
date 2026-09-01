# Desafio 12 — Vale Japonês

Especificação fechada da missão. Este documento é autossuficiente, não depende de outras respostas e não deve vazar conteúdo de outros vales.

## Metadados

| Campo | Valor |
|---|---|
| Data | 2026-09-12 |
| Sequência | 12 |
| Resposta revelada | JAPONÊS |
| Dificuldade | Média-alta |
| Duração esperada | 20 a 30 minutos |
| Pré-requisito | Conhecer a regra básica de SET ou receber a explicação visual embutida na missão |

## Propósito narrativo e regra de isolamento

Esta missão fecha a sequência de pistas gastronômicas e transforma dois tabuleiros de SET em um único destino semântico. O jogador precisa identificar o único conjunto válido em cada tabuleiro e ler o sinal combinado que aponta para a cultura japonesa.

Regra de isolamento: a missão não pode depender de respostas de outros vouchers nem reutilizar palavras-chave externas. As duas mesas são independentes entre si e a solução final é derivada somente dos dados desta missão.

## Fluxo exato do jogador

1. **Tela inicial**
   - Título neutro: `Dois conjuntos`.
   - Texto de apoio: `Dois tabuleiros, um único SET em cada um. Resolva os dois para descobrir a conexão comum.`
   - Botão: `Começar`.

2. **Tabuleiro 1**
   - O jogador vê uma grade `3 x 3` com 9 cartas.
   - A interface explica a regra:
     - em um SET válido, cada atributo é **todo igual** ou **todo diferente**;
     - nunca pode haver dois iguais e um diferente no mesmo atributo.
   - O jogador seleciona 3 cartas.
   - Se acertar:
     - as cartas brilham;
     - aparecem os tokens `YU`, `KI`, `DO` na ordem definida pela especificação;
     - o tabuleiro 2 é liberado.

3. **Tabuleiro 2**
   - O jogador vê outra grade `3 x 3` com 9 cartas.
   - A mesma regra de SET é exibida.
   - Se acertar:
     - as cartas brilham;
     - aparecem os tokens `KA`, `ZU`, `MI` na ordem definida pela especificação;
     - surge a tela final.

4. **Tela final**
   - Mensagem: `Conexão comum encontrada.`
   - Campo de resposta: `Qual é o tema comum dos dois sinais?`
   - Resposta correta: `JAPONÊS`.
   - Depois do acerto, mostrar o bônus emocional opcional:
     - `Temakeria Ipanema`
     - `Gurumê / Japa da Quitanda`
     - `Yukido / Kazumi, na França`

## Recursos e dados obrigatórios

### Recursos visuais

- Duas grades de cartas `3 x 3`.
- Uma moldura de seleção de SET.
- Feedback visual de trio válido.
- Badges de revelação para os tokens `YU`, `KI`, `DO`, `KA`, `ZU`, `MI`.

### Legenda dos atributos

As cartas usam quatro atributos, cada um com três valores possíveis:

| Dígito | Cor | Forma | Preenchimento | Quantidade |
|---|---|---|---|---|
| `0` | verde | círculo | vazado | 1 símbolo |
| `1` | lilás | triângulo | listrado | 2 símbolos |
| `2` | dourado | onda | sólido | 3 símbolos |

A representação de cada carta é um código de quatro dígitos:

`[cor][forma][preenchimento][quantidade]`

Exemplo: `0100` = cor verde, forma triângulo, preenchimento vazado, 1 símbolo.

## Mecânica detalhada

### Regra de SET usada aqui

Três cartas formam um SET quando, em cada atributo:

- os três valores são iguais; ou
- os três valores são todos diferentes.

Se um atributo tiver exatamente dois valores iguais e um diferente, o trio é inválido.

### Propriedade de unicidade usada na missão

A missão foi desenhada em cima de um conjunto base que não contém nenhum SET. Cada tabuleiro recebe apenas uma carta extra que completa exatamente um trio.

Isso garante:

- um único SET por tabuleiro;
- nenhuma ambiguidade de leitura;
- prova simples para o implementador;
- validação determinística.

## Tabuleiro 1 — cartas e solução

### Cartas do tabuleiro

| Carta | Código | Descrição visual | Papel |
|---|---|---|---|
| A1 | `0000` | verde, círculo, vazado, 1 símbolo | solução |
| A2 | `0001` | verde, círculo, vazado, 2 símbolos | solução |
| A3 | `0010` | verde, círculo, listrado, 1 símbolo | distração |
| A4 | `0100` | verde, triângulo, vazado, 1 símbolo | distração |
| A5 | `0101` | verde, triângulo, vazado, 2 símbolos | distração |
| A6 | `0110` | verde, triângulo, listrado, 1 símbolo | distração |
| A7 | `1000` | lilás, círculo, vazado, 1 símbolo | distração |
| A8 | `1001` | lilás, círculo, vazado, 2 símbolos | distração |
| A9 | `0002` | verde, círculo, vazado, 3 símbolos | solução |

### Token de revelação

Depois de validar o trio correto, revelar:

- `A1 → YU`
- `A2 → KI`
- `A9 → DO`

### SET válido

O único trio válido é:

- `0000`
- `0001`
- `0002`

Justificativa:

- cor: todas iguais (`0, 0, 0`);
- forma: todas iguais (`0, 0, 0`);
- preenchimento: todos iguais (`0, 0, 0`);
- quantidade: todos diferentes (`0, 1, 2`).

## Tabuleiro 2 — cartas e solução

### Cartas do tabuleiro

| Carta | Código | Descrição visual | Papel |
|---|---|---|---|
| B1 | `0000` | verde, círculo, vazado, 1 símbolo | distração |
| B2 | `0001` | verde, círculo, vazado, 2 símbolos | distração |
| B3 | `0010` | verde, círculo, listrado, 1 símbolo | distração |
| B4 | `0100` | verde, triângulo, vazado, 1 símbolo | solução |
| B5 | `0101` | verde, triângulo, vazado, 2 símbolos | distração |
| B6 | `0110` | verde, triângulo, listrado, 1 símbolo | distração |
| B7 | `1000` | lilás, círculo, vazado, 1 símbolo | solução |
| B8 | `1001` | lilás, círculo, vazado, 2 símbolos | distração |
| B9 | `2200` | dourado, onda, vazado, 1 símbolo | solução |

### Token de revelação

Depois de validar o trio correto, revelar:

- `B4 → KA`
- `B7 → ZU`
- `B9 → MI`

### SET válido

O único trio válido é:

- `0100`
- `1000`
- `2200`

Justificativa:

- cor: todas diferentes (`0, 1, 2`);
- forma: todas diferentes (`1, 0, 2`);
- preenchimento: todas iguais (`0, 0, 0`);
- quantidade: todas iguais (`0, 0, 0`).

## Solução completa para o implementador

### 1) Provar que o conjunto-base não tem SET

As 8 cartas-base usam apenas `0` e `1` em cada coordenada.

Nesse cenário, não existe trio com valores todos diferentes em uma mesma coordenada, porque só há dois valores possíveis.

Logo, qualquer SET precisaria ter as quatro coordenadas iguais nos três cartões, o que exigiria três cartas idênticas. Isso é inválido em SET.

Portanto, o conjunto-base não possui nenhum SET.

### 2) Mostrar que a carta extra fecha exatamente um trio

#### Tabuleiro 1

A carta extra é `0002`.

Ela completa apenas o par:

- `0000`
- `0001`

Não existe outro par no tabuleiro-base que gere `0002`, então o tabuleiro 1 tem exatamente um SET.

#### Tabuleiro 2

A carta extra é `2200`.

Ela completa apenas o par:

- `0100`
- `1000`

Não existe outro par no tabuleiro-base que gere `2200`, então o tabuleiro 2 tem exatamente um SET.

### 3) Derivar a leitura final

Os dois trios revelados produzem:

- `YU / KI / DO`
- `KA / ZU / MI`

A conexão comum é o universo japonês, então a resposta final do vale é:

**JAPONÊS**

## Variantes aceitas e normalização

### Formas aceitas

- `JAPONÊS`
- `japonês`
- `JAPONES`
- `japones`
- `JapoNês`

### Normalização

Antes de comparar:

1. remover espaços nas extremidades;
2. remover pontuação e símbolos extras;
3. normalizar Unicode;
4. remover acentos;
5. converter para maiúsculas.

Depois da normalização, todas as formas acima viram `JAPONES`.

## Comportamento das tentativas

O contador de erros é compartilhado entre os dois tabuleiros e a resposta final.

- **Após 1 a 2 erros**
  - Mostrar apenas a mensagem genérica de erro no tabuleiro ou na resposta final.

- **Após 3 erros**
  - Mostrar a primeira dica:
    - `Em SET, cada atributo precisa ser todo igual ou todo diferente.`

- **Após 7 erros**
  - Mostrar uma dica mais forte:
    - `Existe exatamente um trio válido em cada tabuleiro; os três cards corretos revelam os blocos YU/KI/DO e KA/ZU/MI.`

- **Após 12 erros**
  - Remover as respostas automáticas e as dicas.
  - Manter apenas a ação `Recorrer ao criador`.
  - Não revelar `JAPONÊS`.

## Bônus emocional desbloqueado

- **Bônus**:
  - `Temakeria Ipanema`
  - `Gurumê / Japa da Quitanda`
  - `Yukido / Kazumi, na França`
- Esse bloco é apenas afetivo, funciona como epílogo e não é necessário para nenhum puzzle posterior.

## Notas de implementação

- O validador de SET deve examinar todas as combinações de 3 cartas do tabuleiro.
- Não misturar o estado do tabuleiro 1 com o do tabuleiro 2.
- O trio correto precisa produzir a sequência de tokens exatamente na ordem documentada.
- O suporte a toque deve evitar seleção dupla acidental da mesma carta.
- Em caso de rotação de tela, o tabuleiro não pode perder a seleção ativa.
- O texto de explicação precisa deixar claro que "todo igual ou todo diferente" vale para cada atributo, individualmente.

## Acessibilidade

- Cada carta deve ser um botão com nome acessível próprio.
- O estado selecionado precisa ser anunciado por leitor de tela.
- A grade deve aceitar navegação por teclado com foco visível.
- Não depender apenas de cor para indicar cartas certas ou erradas.
- Os botões de confirmação devem ter tamanho mínimo de toque de `44 x 44 px`.
- Em modo de movimento reduzido, o brilho das cartas deve virar uma transição discreta ou estática.

## Casos-limite

- Impedir que a mesma carta seja escolhida duas vezes no mesmo trio.
- Rejeitar seleções com menos ou mais de 3 cartas.
- Manter a unicidade mesmo com cartas renderizadas em outra ordem visual, desde que o conjunto de cartas seja o mesmo.
- Preservar o estado ao voltar do modo de pausa ou ao girar o aparelho.
- Não permitir que uma tentativa errada consuma o bônus emocional.

## Critérios de aceite

- Cada tabuleiro tem exatamente um SET válido.
- O tabuleiro 1 revela `YU`, `KI`, `DO`.
- O tabuleiro 2 revela `KA`, `ZU`, `MI`.
- A leitura combinada aponta para `JAPONÊS`.
- O contador de erros aciona as dicas nos pontos 3, 7 e 12.
- O bônus emocional aparece apenas após o acerto final.
- A experiência cabe em celular sem rolagem horizontal e com toque confortável.

## Cenários de teste

| Cenário | Entrada / ação | Resultado esperado |
|---|---|---|
| SET do tabuleiro 1 | Selecionar `0000`, `0001`, `0002` | Aceitar e revelar `YU/KI/DO` |
| Erro do tabuleiro 1 | Selecionar qualquer trio inválido | Rejeitar |
| SET do tabuleiro 2 | Selecionar `0100`, `1000`, `2200` | Aceitar e revelar `KA/ZU/MI` |
| Unicidade 1 | Enumerar todas as combinações de 3 cartas do tabuleiro 1 | Encontrar exatamente 1 SET |
| Unicidade 2 | Enumerar todas as combinações de 3 cartas do tabuleiro 2 | Encontrar exatamente 1 SET |
| Resposta final | Submeter `JAPONÊS` | Sucesso |
| Variante sem acento | Submeter `japones` | Sucesso após normalização |
| Dica 1 | Errar 3 vezes em qualquer etapa | Exibir regra básica de SET |
| Dica 2 | Errar 7 vezes em qualquer etapa | Exibir dica forte sobre os dois trios únicos |
| Bloqueio final | Errar 12 vezes | Mostrar apenas `Recorrer ao criador` |
| Mobile | Abrir em 360 x 640 | Tabuleiros legíveis, sem rolagem horizontal, toque confortável |
| Acessibilidade | Navegar só com teclado | Seleção e confirmação funcionam com foco visível |
