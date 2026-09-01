# 01 — Auditoria do Inventário

| Campo | Valor |
|---|---|
| Data | 2026-09-01 |
| Sequência | 01 |
| Resposta revelada | EXPERIÊNCIAS |
| Dificuldade | Média-alta |
| Duração esperada | 8–12 minutos |
| Pré-requisito | Nenhum |

## Propósito narrativo e regra de isolamento

Este desafio apresenta uma auditoria de sete registros anônimos que não ocupam espaço físico, não têm massa mensurável, não têm volume e só podem ser resgatados no futuro.

A função narrativa é fazer o jogador concluir que a coleção não descreve objetos, mas vivências agendáveis.
Regra de isolamento: este desafio não pode depender, citar nem reutilizar respostas de outros vouchers. Nenhuma pista, tela, dica ou texto de erro pode exigir conhecimento externo.

## Fluxo exato do jogador

1. A tela inicial mostra o título, uma frase curta de contexto e um botão de início.
2. Ao entrar, o jogador vê uma tabela ou lista com sete registros anônimos.
3. Cada registro exibe os mesmos campos visíveis:
   - massa e volume iguais a zero;
   - ocorrência reservada para o futuro;
   - participação presencial necessária;
   - unidade encerrada depois do uso;
   - resultado persistente classificado como memória;
   - impossibilidade de copiar ou transferir a ocorrência já vivida.
4. Abaixo dos registros, o jogador compara quatro classes candidatas em uma tabela de auditoria: objeto, informação, serviço digital e experiência.
5. O jogador elimina as classes incompatíveis e digita a classificação final.
6. Ao enviar a resposta correta, a tela confirma a conclusão, exibe o bônus emocional opcional e libera a continuidade da experiência.
7. Se a resposta estiver errada, o sistema mostra feedback progressivo sem revelar a solução.

## Materiais e dados necessários

- Arte de fundo neutra, com aparência de planilha ou arquivo de auditoria.
- Sete cartões ou linhas de registro.
- Um campo de entrada livre para a classificação final.
- Um botão principal de envio.
- Um bloco de dica progressiva.
- Um bloco de bônus emocional na tela de sucesso.

### Dados mínimos dos sete registros

Os sete registros devem ser renderizados com anonimização total. O conteúdo visível é somente a combinação de atributos:

| Registro | Massa | Volume | Execução | Depois do uso | Resultado |
|---|---:|---:|---|---|---|
| R1 | 0 | 0 | futura e presencial | unidade encerrada | memória |
| R2 | 0 | 0 | futura e presencial | unidade encerrada | memória |
| R3 | 0 | 0 | futura e presencial | unidade encerrada | memória |
| R4 | 0 | 0 | futura e presencial | unidade encerrada | memória |
| R5 | 0 | 0 | futura e presencial | unidade encerrada | memória |
| R6 | 0 | 0 | futura e presencial | unidade encerrada | memória |
| R7 | 0 | 0 | futura e presencial | unidade encerrada | memória |

Os sete registros também exibem `replicável depois do uso: não`. Não devem mostrar nome comercial, imagem ou descrição do vale.

### Matriz de classes fornecida ao jogador

| Classe | Regra de auditoria |
|---|---|
| Objeto | exige suporte físico com massa ou volume diferente de zero |
| Informação | pode ser copiada e continua disponível depois de acessada |
| Serviço digital | pode ser executado remotamente, sem presença no local |
| Experiência | exige participação, ocorre no tempo e deixa memória depois de encerrada |

## Mecânica do quebra-cabeça

O jogador cruza os atributos dos registros com as regras fornecidas:

- `objeto` falha por massa e volume iguais a zero;
- `informação` falha porque a unidade não pode ser copiada e se encerra ao ser usada;
- `serviço digital` falha porque a participação presencial é obrigatória;
- `experiência` satisfaz participação, ocorrência temporal e memória residual.

A matriz torna a resposta única sem depender de interpretação livre.

## Solução completa para o implementer

1. Renderize os sete registros com os mesmos três eixos visíveis: massa, volume e temporalidade.
2. Garanta que nenhum registro tenha uma pista visual que o aproxime de um objeto físico.
3. Preserve o anonimato dos registros; o jogador deve classificar o conjunto, não identificar itens individuais.
4. A resposta correta é a categoria `experiências`.
5. A validação deve usar normalização de caixa e acentos.
6. Quando a resposta estiver correta, mostre a confirmação e o bônus emocional.
7. Não transforme o bônus em pista jogável; ele é apenas recompensa narrativa.

## Resposta final e normalização

### Resposta aceita

- `EXPERIÊNCIAS`

### Variações aceitas

- `experiências`
- `EXPERIENCIAS`
- `experiencias`

### Normalização

- ignorar caixa alta/baixa;
- remover acentos;
- remover espaços extras no início e no fim;
- não aceitar pluralização diferente, sufixos adicionais nem frases completas.

## Comportamento de tentativas

- **Após 1 a 2 erros:** mensagem neutra de erro, sem dica adicional.
- **Após 3 erros:** primeira dica de método: “Não procure um nome para os registros; elimine as classes que violam pelo menos uma regra.”
- **Após 7 erros:** dica intermediária mais forte: “Compare participação presencial, encerramento após o uso e o tipo de resultado que permanece.”
- **Após 12 erros:** substituir a ajuda por um único botão **“Recorrer ao criador”**.
  A partir daí, o sistema não pode revelar a resposta nem oferecer mais dicas automáticas.

## Bônus emocional desbloqueado

O bônus emocional é o reencontro em agosto de 2023, na festa de amigos no Alto da Boa Vista.

Este trecho serve apenas como recompensa afetiva.
Ele não é necessário para resolver, validar ou revisitar o desafio e não deve aparecer como pista em nenhuma etapa posterior.

## Notas de implementação

- Exibir os dados em uma estrutura limpa, legível e compacta.
- Priorizar leitura em tela pequena.
- Deixar a entrada de resposta sempre visível sem exigir rolagem excessiva.
- Exibir as dicas em linguagem simples e curta.
- Registrar erros apenas para controlar a progressão de ajuda.
- Não use temporização para esconder a solução; a única barreira deve ser lógica.

## Acessibilidade

- Campo de resposta com rótulo explícito.
- Erros e dicas anunciados por tecnologia assistiva.
- Contraste alto entre texto e fundo.
- Navegação por teclado e foco visível.
- Botões com alvo mínimo confortável para toque.

## Casos-limite

- Entrada com acento ausente deve ser aceita.
- Entrada com maiúsculas e minúsculas misturadas deve ser aceita.
- Entrada com espaços extras deve ser aceita após normalização.
- Respostas incompletas ou frasais devem ser rejeitadas.
- O bônus emocional não pode alterar a validação.
- O botão **“Recorrer ao criador”** não pode revelar a resposta.

## Critérios de aceite

- O jogador consegue entender, a partir dos sete registros, que a categoria correta é `EXPERIÊNCIAS`.
- Apenas a classificação correta avança o estado do desafio.
- As três etapas de ajuda aparecem exatamente nos limiares definidos.
- A resposta é aceita de forma consistente após normalização.
- O desafio funciona em desktop e em mobile sem depender de zoom.

## Cenários de teste

1. **Resposta correta em caixa alta**
   Entrada: `EXPERIÊNCIAS`
   Resultado esperado: sucesso.

2. **Resposta correta sem acento**
   Entrada: `EXPERIENCIAS`
   Resultado esperado: sucesso.

3. **Erro simples antes da primeira dica**
   Entrada: `produtos`
   Resultado esperado: erro neutro.

4. **Terceiro erro**
   Resultado esperado: exibição da primeira dica de método.

5. **Sétimo erro**
   Resultado esperado: exibição da dica intermediária mais forte.

6. **Décimo segundo erro**
   Resultado esperado: substituição da ajuda pelo botão **“Recorrer ao criador”**.

7. **Viewport móvel 360px**
   Resultado esperado: sem rolagem horizontal, sem quebra de layout e com campos utilizáveis por toque.
