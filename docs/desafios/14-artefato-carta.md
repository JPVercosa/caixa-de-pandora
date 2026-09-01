# Desafio 14 — Artefato-Carta

## Metadados

| Campo | Valor |
| --- | --- |
| Data | 14/09/2026 |
| Sequência | 14 |
| Resposta revelada | CARTA |
| Dificuldade | Alta |
| Duração esperada | 25 a 35 minutos |
| Pré-requisito | Nenhum outro voucher; desafio independente e autossuficiente |

## Propósito narrativo e regra de isolamento

Este é o primeiro momento em que o jogador entende, de forma explícita, que o artefato principal é uma carta. A experiência funciona como uma pequena escape room poliglota, com pistas em português, inglês, francês e espanhol.

Regra de isolamento:

- este desafio não depende da resposta de nenhum outro voucher;
- nenhuma pista pode citar outro desafio ou resposta anterior;
- todo o conteúdo necessário para a solução deve aparecer dentro do próprio desafio;
- o jogador não precisa de conhecimento externo de idioma além de reconhecer palavras comuns e seguir instruções visuais.

## Fluxo exato do jogador

### 1) Tela inicial

O jogador vê:

- título neutro `A porta e as quatro línguas`;
- subtítulo indicando que existe uma porta e um código;
- botão `Abrir`;
- botão `Regras`;
- indicador de progresso com 2 travas.

### 2) Primeira trava — porta Rue Léopold Bellan

A tela mostra o código da porta:

`35A86`

O jogador deve:

1. converter `A` em `1`;
2. ler o resultado como `35186`;
3. usar esses dígitos como índices de extração.

### 3) Segunda trava — extração poliglota

A tela apresenta 5 faixas linguísticas curtas, rotuladas:

- PT
- EN
- FR
- ES
- PT

Cada faixa contém uma definição no próprio idioma e quatro respostas candidatas. Depois de selecionar a única resposta correta, o jogador remove espaços/acentos e aplica o índice correspondente da sequência `3, 5, 1, 8, 6`.

### 4) Conclusão

Ao montar a palavra `CARTA`, o jogador vê:

- confirmação da resposta;
- revelação de que o objeto principal é uma carta;
- desbloqueio do bônus emocional;
- retorno ao hub.

## Materiais e dados necessários

### Assets visuais

- cartão de abertura;
- ícone de porta;
- etiqueta `Rue Léopold Bellan`;
- bloco do código `35A86`;
- 5 faixas linguísticas;
- destaque de posição indexada;
- estado de erro;
- estado de acerto;
- estado de bônus desbloqueado.

### Dados fixos do desafio

#### Conversão do código

- `A` → `1`
- código normalizado: `35186`

#### Índices de extração

- `3`
- `5`
- `1`
- `8`
- `6`

#### Faixas semânticas canônicas

| Faixa | Definição exibida | Opções | Resposta | Forma indexada | Índice | Letra |
|---|---|---|---|---|---:|---|
| PT | “Uma lembrança faz isto quando volta à mente.” | `RECORDA` · `ESQUECE` · `APAGA` · `CALA` | RECORDA | RECORDA | 3 | C |
| EN | “Beyond what was expected.” | `EXTRA` · `LESS` · `PLAIN` · `EARLY` | EXTRA | EXTRA | 5 | A |
| FR | “Action de revenir au point de départ.” | `RETOUR` · `DÉPART` · `OUBLI` · `ARRÊT` | RETOUR | RETOUR | 1 | R |
| ES | “Expresión de regresar hacia la persona amada.” | `VOLVER A TI` · `IRME DE AQUÍ` · `MIRAR ATRÁS` · `QUEDAR LEJOS` | VOLVER A TI | VOLVERATI | 8 | T |
| PT | “Aquilo que a distância exige quando ainda não é hora.” | `ESPERA` · `PRESSA` · `FUGA` · `ESQUECIMENTO` | ESPERA | ESPERA | 6 | A |

## Mecânica do enigma

### Trava 1 — código da porta

Regra:

- o valor `A` não é letra final; ele deve ser convertido em `1`;
- o jogador só prossegue depois de normalizar o código;
- a porta aceita somente o valor normalizado `35186` como referência interna do enigma.

### Trava 2 — extração poliglota

A extração exige primeiro resolver cada definição dentro de seu banco fechado. Depois, remover espaços e diacríticos apenas para contar posições:

1. `RECORDA[3] = C`;
2. `EXTRA[5] = A`;
3. `RETOUR[1] = R`;
4. `VOLVERATI[8] = T`;
5. `ESPERA[6] = A`.

Palavra final: `CARTA`.

## Caminho de solução determinístico

### Resolução passo a passo

1. Ler o código da porta como `35A86`.
2. Converter `A` para `1`, obtendo `35186`.
3. Usar os índices do puzzle na ordem `3, 5, 1, 8, 6`.
4. Resolver as cinco definições e normalizar as respostas para indexação.
5. Ler as letras `C`, `A`, `R`, `T`, `A`.
6. Inserir `CARTA`.

### Solução completa para a implementação

A implementação deve garantir:

- a conversão de `A` para `1` acontece antes de qualquer validação;
- as definições, opções e regras de normalização são estáticas em todos os dispositivos;
- o caminho correto sempre produz `CARTA`;
- nenhuma outra combinação de letras deve ser aceita como solução válida.

## Resposta final aceita e normalização

### Variações aceitas

- `CARTA`
- `carta`
- `Carta`
- `carta.`
- ` carta `

### Normalização

- remover espaços antes e depois;
- remover pontuação final;
- converter para maiúsculas.

## Comportamento de tentativas e dicas

### Após 3 erros

Exibir a primeira dica de método:

> “Converta o código da porta antes de usar os índices.”

### Após 7 erros

Exibir uma dica intermediária mais forte:

> “Resolva as definições antes de contar. Na faixa espanhola, remova os espaços de ‘VOLVER A TI’ e conte a oitava letra.”

### Após 12 erros

Substituir a tentativa por apenas uma ação:

- botão `Recorrer ao criador`

Regras:

- não revelar `CARTA`;
- não mostrar a tabela completa como resposta;
- não explicar o conteúdo da carta antes da resolução.

## Bônus emocional desbloqueado

### Linha do tempo afetiva

Ao concluir o desafio, liberar uma linha do tempo com:

- agosto de 2023;
- a distância entre os dois;
- a mudança para a França;
- a relação contínua desde 12/11/2025.

Importante:

- este bônus é puramente emocional;
- ele não é necessário para resolver o restante do jogo;
- ele não deve virar pista de outros desafios.

## Notas de implementação

- a leitura deve funcionar em português, inglês, francês e espanhol sem troca de layout;
- a extração precisa ser totalmente determinística;
- o campo de entrada deve aceitar a palavra final em teclado virtual e físico;
- o desafio não deve depender de acentuação de idioma para funcionar;
- a conversão `A → 1` deve ser explícita na interface.

## Acessibilidade

- todas as faixas precisam de rótulos textuais claros;
- o código da porta deve ser legível por leitor de tela;
- o índice selecionado precisa ter feedback visual e semântico;
- não usar cor como único indicativo de acerto;
- todo o fluxo deve funcionar sem arrastar;
- os alvos de toque precisam respeitar 44 px de altura/largura.

## Casos-limite

- usuários que tentem ler o código sem converter `A` devem receber erro;
- inserir `35186` como resposta final não pode substituir `CARTA`;
- o puzzle deve funcionar com fontes grandes;
- o layout não pode quebrar em telas estreitas;
- a ordem das faixas não pode mudar por idioma do navegador;
- o bônus não pode aparecer antes da solução correta.

## Critérios de aceite

- o código `35A86` é normalizado para `35186`;
- os índices `3, 5, 1, 8, 6` produzem exatamente `CARTA`;
- a resposta final aceita a normalização prevista;
- as dicas aparecem nas tentativas 3, 7 e 12;
- depois de 12 erros, só `Recorrer ao criador` fica disponível;
- o bônus emocional só aparece após a vitória;
- o desafio continua legível e jogável em celular.

## Cenários de teste

| Cenário | Entrada/ação | Resultado esperado |
| --- | --- | --- |
| Conversão do código | ler `35A86` | sistema transforma em `35186` |
| Extração correta | aplicar `3, 5, 1, 8, 6` | palavra `CARTA` aparece |
| Resposta normalizada | inserir `carta` | aceitação |
| Dica após 3 erros | 3 respostas erradas | primeira dica aparece |
| Dica após 7 erros | 7 respostas erradas | dica intermediária aparece |
| Após 12 erros | 12 respostas erradas | só `Recorrer ao criador` fica disponível |
| Uso em celular | viewport estreita | faixas e índices permanecem legíveis |
| Idioma do navegador | navegador em PT/EN/FR/ES | ordem e solução não mudam |
