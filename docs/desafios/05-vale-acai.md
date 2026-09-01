# Desafio 05 — Vale Açaí

## Metadados

| Campo | Valor |
|---|---|
| Data | 2026-09-05 |
| Sequência | 05 |
| Resposta revelada | AÇAÍ |
| Dificuldade | Fácil |
| Duração esperada | 8 a 10 minutos |
| Pré-requisito | Tela de seleção de vouchers liberada; não depende de respostas anteriores |

## Propósito narrativo e regra de isolamento

Este desafio existe para introduzir a linguagem dos vouchers com um quebra-cabeça curto, mas não infantil. A experiência precisa passar a sensação de dedução técnica: o jogador lê pistas em idiomas diferentes, cruza atributos e conclui uma única resposta.

Regra de isolamento: este arquivo não pode citar, exigir, reutilizar ou inferir respostas de outros vouchers. O conteúdo deve ser auto-suficiente. Se outro desafio mudar, este continua íntegro porque toda a lógica de resolução está fechada aqui.

## Fluxo exato da experiência

1. **Tela inicial do desafio**
   - Título neutro: `Quatro línguas, quatro grades`.
   - Subtítulo: `Resolva o quadro de pistas multilíngues`.
   - Botão principal: `Iniciar`.
   - Texto curto de orientação: as quatro grades usam as regras de posição do Termo e terminam em uma extração.

2. **Tela de instruções**
   - Explica os estados verde, amarelo e cinza, incluindo letras repetidas.
   - Informa que cada grade possui um banco fechado de candidatas.
   - Informa que um índice será revelado após cada grade correta.

3. **Tela das grades**
   - O jogador resolve, em qualquer ordem, as grades PT, EN, FR e ES.
   - Cada uma mostra duas tentativas avaliadas e cinco candidatas.
   - Uma seleção incorreta conta como erro, mas não reinicia grades concluídas.

4. **Tela de extração**
   - Depois das quatro soluções, o jogador aplica os índices revelados.
   - O campo final pede uma palavra em português.
   - A interface normaliza a resposta e conclui somente em `AÇAÍ`.

5. **Tela de conclusão**
   - Mensagem de acerto.
   - Exibe o bônus emocional desbloqueado.
   - Mostra um CTA de seguir para o próximo voucher, sem reutilizar a resposta.

## Ativos e dados necessários

### Ativos visuais

- Cabeçalho neutro; a identidade roxa só aparece depois da resposta correta.
- Quatro grades com rótulos multilíngues, bancos de candidatas e padrões acessíveis.
- Painel de extração com os quatro índices.
- Estados visuais de erro, acerto e bloqueio por excesso de tentativas.
- Tela de bônus emocional com ilustração opcional de duas tigelas de açaí.

### Dados das quatro grades

Cada grade exibe duas tentativas já avaliadas, um banco fechado de cinco candidatas e um índice de extração. Verde significa letra e posição corretas; amarelo significa letra existente em outra posição; cinza significa letra ausente após considerar repetições.

| Idioma | Candidatas | Tentativa 1 | Retorno | Tentativa 2 | Retorno | Solução | Índice |
|---|---|---|---|---|---|---|---:|
| PT | `TIGELA`, `PANELA`, `CANELA`, `JANELA`, `TUTELA` | `PANELA` | ⬛⬛⬛🟩🟩🟩 | `TUTELA` | 🟩⬛⬛🟩🟩🟩 | `TIGELA` | 6 |
| EN | `CREAM`, `DREAM`, `BREAK`, `CLEAR`, `GREAT` | `DREAM` | ⬛🟩🟩🟩🟩 | `CLEAR` | 🟩⬛🟩🟩🟨 | `CREAM` | 1 |
| FR | `FRAISE`, `BRAISE`, `FRANGE`, `FRAUDE`, `FRISEE` | `BRAISE` | ⬛🟩🟩🟩🟩🟩 | `FRANGE` | 🟩🟩🟩⬛⬛🟩 | `FRAISE` | 3 |
| ES | `FRÍO`, `FRÍA`, `TRÍO`, `CRÍO`, `BRÍO` | `TRÍO` | ⬛🟩🟩🟩 | `FARO` | 🟩⬛🟨🟩 | `FRÍO` | 3 |

Os acentos são ignorados para calcular o retorno, mas permanecem visíveis nas candidatas. O contador de erros da missão considera uma escolha errada em qualquer grade ou uma palavra final incorreta.

## Mecânica do puzzle

### Etapa 1 — resolver as grades

O jogador seleciona uma candidata por idioma. As duas linhas de feedback tornam a solução única dentro do banco apresentado. A interface só libera o índice daquela grade depois da seleção correta.

### Etapa 2 — extrair a palavra

Aplicar o índice em cada solução, na ordem PT → EN → FR → ES:

- `TIGELA[6] = A`;
- `CREAM[1] = C`;
- `FRAISE[3] = A`;
- `FRÍO[3] = Í`.

A sequência visual é `A C A Í`; a resposta canônica, com ortografia portuguesa, é `AÇAÍ`. A cedilha não precisa ser deduzida pela grade: a tela final informa que a resposta deve ser escrita em português e aceita a forma sem diacríticos.

### Prova de unicidade

Para cada idioma, calcular o par de padrões de todas as cinco candidatas. Somente a solução listada reproduz simultaneamente os dois retornos. O teste automatizado futuro deve falhar se outra candidata passar a produzir o mesmo par.

## Caminho determinístico de solução

1. Comparar cada candidata com as duas tentativas avaliadas.
2. Selecionar `TIGELA`, `CREAM`, `FRAISE` e `FRÍO`.
3. Receber os índices `6, 1, 3, 3`.
4. Extrair `A`, `C`, `A`, `Í`.
5. Normalizar a palavra para a grafia portuguesa `AÇAÍ` e submetê-la.

## Walkthrough completo para o implementador

1. Renderizar as quatro grades e seus bancos exatamente como na tabela.
2. Calcular feedback com contagem correta de letras repetidas, sem tratar amarelos em excesso como válidos.
3. Validar cada escolha contra a solução do idioma e revelar seu índice somente no acerto.
4. Depois das quatro grades, exibir os resultados e pedir uma única palavra em português.
5. Comparar a resposta final normalizada com `ACAI`.
6. Em sucesso, marcar a missão concluída e liberar o bônus; em erro, preservar todas as grades já resolvidas.

## Resposta final aceita e normalização

### Variantes aceitas

- `AÇAÍ`
- `AÇAI`
- `ACAI`
- `açaí`
- `acai`
- `Açaí`

### Normalização

- converter para maiúsculas;
- remover diacríticos;
- remover pontuação e espaços internos;
- comparar com `ACAI`.

Rejeitar qualquer entrada que normalize para outra sequência, mesmo que pareça próxima.

## Comportamento das tentativas e dicas

| Erros acumulados | Comportamento |
|---|---|
| 1 a 2 | Apenas feedback neutro de erro e registro de tentativa |
| 3 | Exibir a primeira dica de método: `Pense no alimento roxo servido em bowl; não procure uma sobremesa quente.` |
| 4 a 6 | Reforçar o quadro sem entregar a resposta |
| 7 | Exibir a dica intermediária forte: `O nome final é de um fruto amazônico usado como base cremosa e fria; a resposta não é uma cobertura.` |
| 8 a 11 | Manter apenas reforço de direção, sem novo conteúdo factual |
| 12 ou mais | Substituir dicas por uma única ação: `Recorrer ao criador` |

Regra obrigatória: em nenhum ponto o sistema pode revelar a resposta explicitamente nas dicas, inclusive após o limite de 12 erros.

## Bônus emocional desbloqueado

Ao completar o desafio, o jogador desbloqueia um bônus emocional que compara:

- a tigela da Maria Açaí, com bastante morango;
- o Oakberry dele, com banana, leite condensado, mel e leite em pó.

Esse bônus é apenas narrativo. Ele não é necessário para o próximo voucher, não altera validações futuras e não deve ser reutilizado em nenhum outro puzzle.

## Notas de implementação, acessibilidade e casos extremos

### Implementação

- Mantenha o puzzle independente de idioma do sistema.
- Não dependa de capitalização do teclado.
- Preserve o estado de erros ao recarregar a tela, se o produto já fizer persistência de sessão.

### Acessibilidade

- Todas as cartas precisam de rótulo textual.
- O estado das tentativas deve ser legível por leitor de tela.
- O campo de resposta deve aceitar teclado virtual mobile.
- O contraste do roxo precisa permanecer legível em fundo claro e escuro.

### Casos extremos

- Entrada vazia: recusar sem consumir tentativa.
- Espaços extras: aceitar após normalização.
- Acentos ausentes: aceitar após normalização.
- Respostas com sufixos como `BOWL` ou explicações extras: rejeitar.
- Contador acima de 12: nunca revelar a resposta, apenas a ação `Recorrer ao criador`.

## Critérios de aceite

- O desafio apresenta exatamente as quatro pistas fixas.
- Existe uma única resposta válida após normalização.
- A resposta aceita corresponde a `ACAI`.
- O comportamento de dicas segue os limiares 3, 7 e 12.
- O bônus emocional aparece apenas após o acerto.
- O desafio não depende de resposta de outros vouchers.
- A experiência continua usável em telas pequenas.

## Cenários de teste

1. **Fluxo feliz**
   - Dado `AÇAÍ`, o sistema aceita e conclui o voucher.

2. **Normalização sem acento**
   - Dado `acai`, o sistema aceita.

3. **Primeira dica**
   - Após 3 erros, a dica de método é exibida.

4. **Dica intermediária**
   - Após 7 erros, a dica forte aparece, sem revelar a resposta.

5. **Bloqueio por excesso**
   - Após 12 erros, apenas `Recorrer ao criador` fica disponível.

6. **Mobile**
   - Em largura estreita, o quadro continua legível, rolável se necessário, e o botão principal permanece tocável.

7. **Isolamento**
   - Alterar qualquer outro voucher não muda a solução nem as mensagens deste arquivo.
