# Desafio 13 — Vale-Joia

## Metadados

| Campo | Valor |
| --- | --- |
| Data | 13/09/2026 |
| Sequência | 13 |
| Resposta revelada | JOIA |
| Dificuldade | Muito alta |
| Duração esperada | 25 a 35 minutos |
| Pré-requisito | Nenhum outro voucher; este desafio é totalmente isolado |

## Propósito narrativo e regra de isolamento

Este desafio é o voucher de maior valor da coleção. Ele foi desenhado para parecer uma lembrança afetiva, mas na prática é um teste de observação, associação lógica e leitura criptográfica.

Regra de isolamento:

- este desafio não pode depender da resposta de nenhum outro voucher;
- nenhuma pista pode citar respostas anteriores ou futuras;
- nenhum dado externo é necessário para resolver o enigma;
- a solução completa deve estar contida no conteúdo desta página e no conteúdo mostrado ao jogador dentro do próprio desafio.

O jogador pode reconhecer referências afetivas, mas não precisa saber nada fora do que o desafio já expõe.

## Fluxo exato do jogador

### 1) Tela inicial

O jogador vê:

- título neutro `O cofre dourado`;
- uma frase curta de apresentação;
- botão primário `Iniciar`;
- botão secundário `Ver regras`;
- indicador de progresso com 3 travas.

Ao tocar em `Iniciar`, o sistema leva para a primeira trava sem animações longas.

### 2) Primeira trava — tabela de materiais

A tela mostra cinco materiais anônimos e o requisito do cofre:

> Selecione o material de número atômico 79, densidade aproximada de 19,3 g/cm³ e aparência metálica amarela.

| Ficha | Símbolo | Número atômico | Densidade aproximada | Aparência |
|---|---|---:|---:|---|
| M1 | Ag | 47 | 10,5 g/cm³ | branca-prateada |
| M2 | Au | 79 | 19,3 g/cm³ | amarela metálica |
| M3 | Pt | 78 | 21,5 g/cm³ | branca-prateada |
| M4 | Cu | 29 | 8,9 g/cm³ | avermelhada |
| M5 | Fe | 26 | 7,9 g/cm³ | cinza |

Somente `M2 / Au` satisfaz simultaneamente os três requisitos. O símbolo `AU` torna-se a chave da última trava.

### 3) Segunda trava — grade lógica

A tela mostra uma grade lógica com cinco posições e três categorias associadas a cada posição:

- Peça;
- Origem;
- Propriedade;
- posição de exposição, de 1 a 5.

O jogador cruza as informações, fecha a grade e confirma a combinação única.

### 4) Terceira trava — extração criptográfica

Depois da grade lógica, cada peça revela um caractere cifrado. O jogador ordena os quatro caracteres associados às origens `Veneza → Disney → Pandora → Swarovski`, descarta Monte Carlo e obtém `JIIU`. A tela fornece a regra de Vigenère e pede para decifrar com a chave `AU` repetida.

Quando a palavra final é inserida, o desafio termina.

### 5) Conclusão

O jogador vê:

- confirmação da resposta;
- mensagem de conclusão;
- desbloqueio do bônus emocional;
- retorno para o hub de desafios.

## Materiais e dados necessários

### Assets visuais

- cartão de abertura do desafio;
- ícone de trava;
- 5 chips de material;
- 5 cartões de peça;
- 5 etiquetas de origem;
- 5 etiquetas de propriedade;
- matriz final de extração;
- estado de acerto;
- estado de erro;
- estado de bônus desbloqueado.

### Dados fixos do desafio

#### Materiais

Usar integralmente a tabela técnica da primeira trava. Não exibir o nome “ouro” antes de `Au` ser selecionado.

#### Peças

1. Anel de Veneza
2. Anel estrela da Disney
3. Colar com foto gravada
4. Brincos dourados
5. Pulseira de cristais

#### Origens

1. Veneza
2. Disney
3. Pandora
4. Swarovski
5. Monte Carlo

#### Propriedades

1. aro fino
2. com estrela
3. gravado com foto
4. com cristais
5. fecho de pressão

#### Ordem canônica e caractere cifrado

| Posição | Peça | Origem | Propriedade | Caractere |
|---:|---|---|---|---|
| 1 | Anel de Veneza | Veneza | aro fino | J |
| 2 | Colar com foto gravada | Pandora | gravado com foto | I |
| 3 | Brincos dourados | Monte Carlo | fecho de pressão | X |
| 4 | Pulseira de cristais | Swarovski | com cristais | U |
| 5 | Anel estrela da Disney | Disney | com estrela | I |

## Mecânica do enigma

### Trava 1 — seleção do material

O jogador cruza três propriedades técnicas. Somente a linha M2 combina número atômico 79, densidade 19,3 e aparência amarela. A resposta intermediária é `AU`; nenhum conhecimento externo é necessário porque todos os valores estão na tela.

### Trava 2 — grade lógica

Usar as peças, origens, propriedades e posições da ordem canônica. Mostrar estas pistas:

1. O item de Veneza ocupa uma extremidade e aparece antes do item da Disney.
2. O colar está imediatamente antes dos brincos.
3. O item de Monte Carlo está imediatamente entre Pandora e Swarovski, nessa ordem da esquerda para a direita.
4. A peça com cristais está imediatamente antes da peça com estrela.
5. A peça com foto ocupa a posição 2 e veio da Pandora.
6. A pulseira veio da Swarovski.
7. Os brincos têm fecho de pressão e não vieram da Disney.
8. O aro fino pertence ao item de Veneza.
9. O item da Disney é um anel, mas não é o anel de Veneza.

A cadeia força: foto/colar/Pandora na posição 2; brincos/Monte Carlo na 3; pulseira/cristais/Swarovski na 4; anel estrela/Disney na 5; anel veneziano/aro fino/Veneza na 1. Durante a implementação, um enumerador deve confirmar que não existe segunda atribuição válida.

### Trava 3 — Vigenère

1. Ler o caractere das peças na ordem de origem indicada: Veneza (`J`), Disney (`I`), Pandora (`I`) e Swarovski (`U`). Monte Carlo é explicitamente marcado como decoy depois da grade.
2. Obter o criptograma `JIIU`.
3. Repetir a chave da primeira trava: `AUAU`.
4. Usar alfabeto `A=0, B=1, …, Z=25` e a operação de decifragem `P = (C − K) mod 26`.
5. Calcular: `J−A=J`, `I−U=O`, `I−A=I`, `U−U=A`.

Resultado: `JOIA`.

## Caminho de solução determinístico

### Resolução passo a passo

1. Identificar `Au` como a única escolha válida na trava de material.
2. Cruzar as pistas da grade lógica:
   - posição 2 fixa colar/foto/Pandora;
   - a relação “exatamente entre” fixa Monte Carlo na posição 3;
   - as adjacências fixam Swarovski/cristais na 4 e Disney/estrela na 5;
   - a extremidade restante fixa Veneza/aro fino na 1.
3. Reordenar os caracteres por Veneza, Disney, Pandora e Swarovski para obter `JIIU`.
4. Decifrar `JIIU` com a chave repetida `AUAU`.
5. Inserir `JOIA`.

### Solução completa para a implementação

A implementação deve garantir exatamente isto:

- o valor correto da trava 1 é `Au`;
- um enumerador deve provar uma única solução para a grade;
- a extração deve produzir `JIIU` e a decifragem com `AU` deve produzir `JOIA`;
- o sistema não pode gerar letras diferentes por dispositivo, idioma do navegador ou tamanho da tela.

## Resposta final aceita e normalização

### Variações aceitas

- `JOIA`
- `joia`
- `Joia`
- `jóia`
- `JÓIA`

### Normalização

- remover espaços antes e depois;
- remover hífens e pontuação;
- normalizar acentos;
- converter para maiúsculas.

Exemplo:

- entrada: ` jóia `
- normalizada: `JOIA`

## Comportamento de tentativas e dicas

### Após 3 erros

Exibir a primeira dica de método:

> “Na primeira trava, procure a linha que satisfaz os três requisitos simultaneamente; não escolha apenas pela aparência.”

### Após 7 erros

Exibir uma dica intermediária mais forte:

> “Na grade, fixe primeiro a posição 2; depois use ‘exatamente entre’ e as duas relações de adjacência. A última trava usa subtração modular.”

### Após 12 erros

Substituir a tentativa por apenas uma ação:

- botão `Recorrer ao criador`

Regras:

- não revelar a resposta;
- não mostrar a matriz final completa;
- não sugerir a palavra `JOIA`.

## Bônus emocional desbloqueado

### Galeria de joias

Ao concluir o desafio, liberar uma galeria com as peças organizadas e legendadas.

O conteúdo emocional deve destacar somente fatos confirmados: preferência por dourado/banhado a ouro, anel comprado em Veneza num momento a dois, anel dourado em forma de estrela da Disney, colar com a foto do casal gravada e as joias que ela usa diariamente. Pandora, Swarovski e Monte Carlo podem aparecer como referências gerais, sem atribuir uma peça específica não confirmada.

Importante:

- este bônus é apenas celebratório;
- ele não é necessário para avançar em nenhum outro desafio;
- ele não fornece pistas novas para o restante do jogo.

## Notas de implementação

- usar seleção por toque, não arrastar-e-soltar obrigatório;
- manter a trava 1 em um único clique de confirmação;
- a grade lógica deve ser legível em telas pequenas;
- a extração final deve aceitar entrada manual; a palavra só pode ser copiada depois do acerto;
- os estados de erro e acerto devem persistir ao voltar e avançar de tela.

## Acessibilidade

- todos os controles precisam de foco visível;
- as peças devem ter rótulos textuais completos;
- nenhuma pista pode depender apenas de cor;
- a matriz de extração precisa ter leitura clara em contraste alto;
- o fluxo deve funcionar só com teclado;
- os alvos de toque devem ter pelo menos 44 px de altura/largura.

## Casos-limite

- repetir uma escolha errada não pode travar o fluxo;
- o desafio não pode aceitar `JOIA` antes de a trava 3 ser aberta;
- acentos e caixa alta/baixa devem ser normalizados;
- tela estreita não pode esconder a grade lógica;
- a galeria bônus não pode quebrar a navegação de volta ao hub.

## Critérios de aceite

- a trava 1 aceita apenas `Au`;
- a grade lógica possui uma única solução;
- a extração final produz apenas `JOIA`;
- as dicas aparecem exatamente nas tentativas 3, 7 e 12;
- depois de 12 erros, a única ação disponível é `Recorrer ao criador`;
- o bônus emocional aparece apenas após a vitória;
- o fluxo é utilizável em celular sem depender de hover ou precisão excessiva.

## Cenários de teste

| Cenário | Entrada/ação | Resultado esperado |
| --- | --- | --- |
| Seleção correta na trava 1 | tocar em `Au` | trava avança |
| Seleção incorreta na trava 1 | tocar em `Ag` | erro, sem avanço |
| Grade lógica única | preencher a combinação canônica | trava 3 é liberada |
| Extração final correta | inserir `JOIA` | conclusão do desafio |
| Normalização | inserir `jóia` | aceitação |
| Dica após 3 erros | 3 respostas erradas | primeira dica aparece |
| Dica após 7 erros | 7 respostas erradas | dica intermediária aparece |
| Após 12 erros | 12 respostas erradas | só `Recorrer ao criador` fica disponível |
| Uso em celular | viewport estreita | layout permanece legível e tocável |
