# Desafio 15 — Última milha

## Metadados

| Campo | Valor |
|---|---|
| Data | 15/09/2026 |
| Sequência | 15 |
| Resposta revelada | `CAIXA DE CORREIOS` + `LATERAL INTERNA DIREITA` |
| Dificuldade | Alta |
| Duração esperada | 20 a 30 minutos |
| Pré-requisito | Liberação de 15/09; nenhuma resposta anterior é usada na lógica |

## Propósito narrativo

Este é o encerramento físico da jornada. O desafio traduz a ideia de “última milha” em duas decisões encadeadas:

1. identificar o destino material correto da carta;
2. localizar, dentro desse destino, a face interna exata onde a carta foi colada.

A intenção é fazer o jogador sair de uma leitura abstrata para uma verificação espacial concreta, fechando a experiência com uma descoberta tátil e inequívoca.

## Regra de isolamento

Este desafio deve ser completamente autossuficiente.

- Não pode depender de respostas de outros vouchers.
- Não pode citar senhas, nomes, códigos ou padrões já usados em missões anteriores.
- Não pode exigir que o jogador memorize informações externas ao próprio enunciado desta missão.
- Toda informação necessária para resolver o desafio deve aparecer nesta especificação e no conteúdo exibido ao jogador.

## Visão geral do fluxo do jogador

### Tela inicial

O jogador vê um cartão de missão com:

- título neutro `Última milha`;
- uma breve frase sobre a “última milha”;
- um campo único de resposta;
- um botão de validar;
- um link ou botão secundário de ajuda, que só expõe dicas conforme a contagem de erros;
- um contador de tentativas erradas visível ou inferível pela interface.

### Etapa 1 — Identificação do receptáculo

O enunciado apresenta os dados postais:

- `Rue Léopold Bellan`
- `prédio 16`
- `apartamento 12`
- `código 35A86`

O jogador deve concluir que esses dados apontam para a **CAIXA DE CORREIOS / BOÎTE AUX LETTRES**.

Essa identificação serve como confirmação intermediária da leitura correta do grafo e como transição narrativa para a segunda etapa. Ela não encerra a missão.

### Etapa 2 — Orientação espacial interna

Depois de reconhecer o receptáculo, o enunciado passa a orientar o jogador para imaginar o ponto de vista **de alguém olhando para dentro da caixa de correio já aberta**.

Com essa orientação, o único local compatível com a descrição final é a face **LATERAL INTERNA DIREITA**.

### Finalização

Ao inserir a resposta correta, o sistema confirma a missão, libera a leitura final e mostra o bônus emocional. O bônus não é necessário para nenhuma missão posterior.

## Materiais e dados necessários

### Dados textuais obrigatórios

- `Rue Léopold Bellan`
- `prédio 16`
- `apartamento 12`
- `código 35A86`
- `CAIXA DE CORREIOS / BOÎTE AUX LETTRES`
- `LATERAL INTERNA DIREITA`

### Elementos visuais sugeridos

- um cartão principal com o enunciado;
- um bloco com os dados postais em destaque;
- um esquema simples da caixa de correio aberta;
- um marcador visual de orientação “visto de frente, olhando para dentro”.

### Elementos de interface

- campo de resposta em caixa alta ou com normalização automática;
- botão “Validar”;
- feedback de erro curto;
- sistema de dicas progressivas;
- ação final “Recorrer ao criador” após o limite de erros.

## Mecânica do puzzle

### Estrutura lógica

O desafio usa uma cadeia de duas inferências:

1. **grafo postal de última milha**: os dados `Rue Léopold Bellan`, `prédio 16`, `apartamento 12` e `código 35A86` formam um endereçamento interno e levam ao receptáculo físico correto;
2. **dedução espacial 3D**: uma vez aberto o receptáculo, a carta está presa na face interna direita quando observada do ponto de vista de quem olha para dentro da caixa.

### Grafo postal

O jogador recebe este grafo com o nó final oculto:

```text
Centro postal → Rue Léopold Bellan → Prédio 16 → código 35A86 → hall comum
                                                             ├─ recepção
                                                             ├─ elevador → porta do apto. 12
                                                             └─ banco de receptáculos → [DESTINO]
```

Regras exibidas junto ao grafo:

1. a entrega é uma correspondência comum, não registrada;
2. o entregador pode entrar somente em áreas comuns;
3. o destinatário não precisa estar presente;
4. o destino final precisa estar associado ao apartamento 12;
5. recepção, elevador e porta privada não armazenam correspondência comum;
6. o código `35A86` abre a entrada do prédio, não identifica o destino final.

Somente o ramo `banco de receptáculos` satisfaz todas as regras. O nó oculto deve ser preenchido com **CAIXA DE CORREIOS / BOÎTE AUX LETTRES**.

### Diagrama espacial

O diagrama da etapa 2 deve representar uma caixa retangular aberta pela face frontal, com orientação explícita:

- o observador está **à frente da abertura**;
- o observador está **olhando para dentro**;
- direita e esquerda são definidas **do ponto de vista do observador**, não do objeto;
- a carta está fixada na face interna direita.

Especificação do diagrama:

```text
Vista do observador: frontal, olhando para dentro da caixa aberta

          topo interno
     ┌───────────────────┐
     │                   │
esq. │                   │ dir.
int. │                   │ int.
     │                   │
     └───────────────────┘
        base interna

Resposta-alvo: lateral interna direita
```

Além do desenho, mostrar uma tabela de faces em coordenadas do observador:

| Face candidata | Orientação | Coordenada característica |
|---|---|---|
| topo | horizontal | `y > 0` |
| base | horizontal | `y < 0` |
| fundo | vertical, paralela à abertura | `z < 0` |
| lateral esquerda | vertical, perpendicular ao fundo | `x < 0` |
| lateral direita | vertical, perpendicular ao fundo | `x > 0` |

Pistas físicas:

- o papel permanece fixo, portanto está aderido e não apoiado;
- a superfície é vertical e perpendicular ao fundo;
- o papel não bloqueia a abertura e não está no fundo;
- visto da abertura para dentro, a coordenada da superfície é `x > 0`;
- a face é interna.

### Regras de interpretação

- “lateral” exclui topo, base, frente e fundo;
- “interna” exclui a face externa da caixa;
- “direita” é relativa ao ponto de vista do observador olhando para dentro;
- a instrução final deve levar o jogador a concluir uma única face possível.

## Caminho determinístico da solução

### Etapa 1 — identificar a caixa de correios

1. O jogador lê endereço, prédio, código e o grafo ramificado.
2. A regra de área comum elimina a porta do apartamento.
3. A ausência do destinatário elimina entrega em mãos ou recepção dependente de pessoa.
4. A exigência de armazenamento associado ao apartamento 12 elimina elevador e hall.
5. O ramo do banco de receptáculos leva à **caixa de correios**.

### Etapa 2 — localizar a face correta

1. O jogador imagina a caixa de correios aberta.
2. Assume o ponto de vista de quem está de frente para a abertura.
3. Usa a tabela: vertical elimina topo/base; perpendicular ao fundo elimina o próprio fundo; `x > 0` elimina a lateral esquerda.
4. Elimina as demais faces:
   - lateral interna esquerda;
   - topo interno;
   - base interna;
   - fundo interno.
5. Conclui que a carta está colada na **lateral interna direita**.

### Resultado final

A resposta final é a combinação operacional:

`LATERAL INTERNA DIREITA`

## Solução completa para o implementador

Esta é a resolução que o sistema deve considerar verdadeira.

1. O bloco postal conduz ao objeto físico correto: **caixa de correios / boîte aux lettres**.
2. A carta não está solta, nem na tampa, nem na frente externa, nem no fundo.
3. O enunciado de orientação define um observador em frente à abertura, olhando para dentro.
4. Com essa referência, o lado direito interno é o único lado compatível com a pista final.
5. A carta física foi colada na **lateral interna direita**.

### Frase de validação do conteúdo interno

O jogador pode receber uma confirmação narrativa do tipo:

> “Você encontrou a face certa da caixa. A carta estava presa na lateral interna direita.”

Essa frase não deve aparecer antes da resposta correta ser submetida.

## Variantes aceitas da resposta final

### Variantes aceitas

- `LATERAL INTERNA DIREITA`
- `LATERAL DIREITA INTERNA`
- `DIREITA INTERNA`
- `LATERAL INTERNA DIREITA DA CAIXA`

### Normalização

Antes de comparar, o sistema deve:

- converter para caixa alta;
- remover acentos;
- remover espaços duplicados;
- ignorar hífens e pontuação;
- aceitar barras e separadores equivalentes apenas quando não alterarem o sentido.

### Regra de comparação

Uma resposta é válida se, após normalização, contiver a intenção inequívoca da face final.

Para a submissão final, a forma canônica preferida é sempre:

`LATERAL INTERNA DIREITA`

### Variantes aceitas da confirmação intermediária

Se a implementação expuser uma confirmação de etapa, ela pode aceitar:

- `CAIXA DE CORREIOS`
- `BOITE AUX LETTRES`
- `BOÎTE AUX LETTRES`
- `CAIXA DE CORREIOS / BOÎTE AUX LETTRES`

## Comportamento das tentativas

### Após 1 a 2 erros

- mostrar erro genérico;
- não revelar o destino;
- não revelar a orientação espacial;
- manter o campo ativo para nova tentativa.

### Após 3 erros

- mostrar uma dica de primeiro método;
- a dica deve orientar o raciocínio sem entregar a resposta.

Exemplo de dica permitida:

> “Releia o endereço como um caminho de entrega: primeiro o local, depois o ponto final.”

### Após 7 erros

- mostrar uma dica intermediária mais forte;
- ela pode explicitar a mudança de etapa entre receptáculo e face interna;
- ainda assim, não pode entregar a resposta final.

Exemplo de dica permitida:

> “Você já identificou o recipiente certo. Agora pense na sua orientação a partir de alguém que está olhando para dentro dele.”

### Após 12 erros

- ocultar novas dicas;
- bloquear novas pistas automáticas;
- mostrar apenas a ação **“Recorrer ao criador”**;
- nunca revelar a resposta.

### Regra geral

Em nenhuma contagem de erro o sistema pode mostrar a resposta final completa antes da submissão correta.

## Bônus emocional desbloqueado

Ao concluir o desafio, o jogador desbloqueia uma mensagem de aniversário curta e afetuosa.

### Exemplo de bônus

> “Parabéns. Você chegou até o fim da trilha e encontrou a última peça da surpresa.”

### Regra de uso

- esse bônus é apenas celebrativo;
- não é necessário para nenhuma etapa posterior;
- não deve conter instruções operacionais para outras partes do projeto.

## Notas de implementação

- O texto deve tratar o ponto de vista de forma inequívoca para evitar inversão esquerda/direita.
- A validação deve ser tolerante a acentos, maiúsculas, barras e pequenas variações de espaçamento.
- A interface deve impedir que o jogador precise rolar excessivamente em telas pequenas.
- Se houver esquema visual, ele deve ser legível em celular e não depender de hover.
- O sistema de tentativas deve ser persistente apenas durante a sessão do desafio.

## Acessibilidade

- Garantir contraste suficiente entre caixa, texto e marcações de orientação.
- Fornecer rótulos acessíveis para o campo de resposta e para o botão de validar.
- Não depender exclusivamente de cor para indicar erro ou acerto.
- O diagrama deve ter descrição textual equivalente para leitores de tela.
- As dicas devem ser lidas na ordem em que aparecem e anunciadas como atualização de estado.

## Casos de borda

### Ambiguidade de orientação

Se o jogador interpretar a direita a partir do ponto de vista externo da caixa, a resposta deve continuar inválida. O enunciado precisa reforçar que o ponto de vista é **de quem olha para dentro**.

### Resposta com sinônimos parciais

Se o jogador escrever apenas `DIREITA` ou apenas `LATERAL DIREITA`, a interface pode manter a tentativa como incorreta até que a formulação indique claramente a face interna correta.

### Mistura de idiomas

Respostas em português, francês ou híbridas podem ser aceitas desde que a intenção final seja inequívoca.

### Inserção de caracteres extras

Pontuação, acentos e barras não devem quebrar a validação quando não alterarem o significado.

### Tela pequena

A informação deve caber em uma viewport móvel comum sem ocultar o campo de resposta ou as instruções essenciais.

## Critérios de aceite

1. O jogador entende, sem ajuda externa, que os dados postais levam à caixa de correios.
2. O jogador entende, sem ambiguidade, que a orientação correta é interna e relativa ao observador.
3. A resposta final correta é única na intenção: `LATERAL INTERNA DIREITA`.
4. A etapa 1 não confunde o jogador com respostas alternativas como porta, apartamento ou prédio.
5. O sistema oferece dica após 3 erros, dica mais forte após 7 e apenas “Recorrer ao criador” após 12.
6. A carta física é localizada na face descrita pela solução.
7. O bônus emocional aparece apenas após o sucesso e não é necessário para outras missões.
8. A experiência permanece utilizável em celular.

## Cenários de teste

### Teste 1 — solução correta direta

- Entrada: `lateral interna direita`
- Resultado esperado: sucesso imediato após normalização.

### Teste 2 — variação aceita com idioma misto

- Entrada: `Boîte aux lettres - lateral interna direita`
- Resultado esperado: sucesso, desde que a etapa final esteja inequívoca.

### Teste 3 — etapa postal isolada

- Entrada: `caixa de correios`
- Resultado esperado: deve ser aceita apenas como confirmação intermediária, nunca como resposta final.

### Teste 4 — erro inicial

- Entrada: `direita`
- Resultado esperado: erro genérico sem revelação de resposta.

### Teste 5 — dica após 3 erros

- Condição: três tentativas erradas acumuladas.
- Resultado esperado: primeira dica de método, sem entregar a resposta.

### Teste 6 — dica forte após 7 erros

- Condição: sete tentativas erradas acumuladas.
- Resultado esperado: dica intermediária explícita sobre o ponto de vista interno.

### Teste 7 — bloqueio após 12 erros

- Condição: doze tentativas erradas acumuladas.
- Resultado esperado: só a ação “Recorrer ao criador”, sem nova pista automática.

### Teste 8 — usabilidade móvel

- Execução: abrir o desafio em viewport estreita.
- Resultado esperado: título, instruções essenciais, campo de resposta e botão de validar permanecem acessíveis sem zoom obrigatório.

### Teste 9 — unicidade da solução

- Execução: confrontar variações como `lateral externa direita`, `fundo`, `topo` e `porta`.
- Resultado esperado: todas rejeitadas.

### Teste 10 — bônus emocional

- Execução: concluir com a resposta correta.
- Resultado esperado: exibir mensagem de aniversário curta e não funcional, sem dependência posterior.

## Instrução final ao jogador

Quando a etapa 2 estiver resolvida, a tela deve orientar o jogador com uma frase curta e direta, por exemplo:

> “Abra a caixa de correios e procure na lateral interna direita.”

Essa frase é o fechamento da missão e confirma o local físico exato da carta.
