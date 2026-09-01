# Desafio 10 — Vale-Cinema

Especificação fechada do voucher 10, construída como uma noite de sessões, lógica de programação e leitura de camadas sonoras originais. Este documento é autossuficiente e não depende da resposta de nenhum outro voucher.

## Metadados

| Campo | Valor |
| --- | --- |
| Data | 2026-09-10 |
| Sequência | 10 |
| Resposta revelada | CINEMA |
| Dificuldade | Média-alta |
| Duração esperada | 18 a 25 minutos |
| Pré-requisito | Fluxo padrão de lógica com grade de sessões; nenhuma resposta de outro voucher é necessária |

## Propósito narrativo e regra de isolamento

O desafio representa uma sessão dupla em VOSTFR com programação noturna, pensada para um casal que quer descobrir qual sessão corresponde ao encontro certo. O raciocínio é totalmente interno: o jogador cruza horário, idioma, público, dificuldade de legenda e camadas sonoras para obter uma única palavra de validação.

Regra de isolamento:

- este arquivo não deve importar respostas ou pistas de outros vouchers;
- os títulos citados aqui aparecem apenas como referências nominais da programação;
- não usar trechos, cartazes, spoilers ou materiais protegidos por direitos autorais;
- a solução final é sempre a mesma, independentemente de qualquer outro desafio.

## Fluxo exato da tela do jogador

1. **Tela inicial**
   - título neutro: `Programação VOSTFR`;
   - subtítulo: `Uma noite em VOSTFR com duas referências e uma única sessão certa`;
   - botão principal: `Iniciar`;
   - botão secundário: `Dica`;
   - contador de erros visível;
   - aviso de que a programação é fictícia e livre de spoilers.

2. **Tela da grade de sessões**
   - aparece uma tabela com horários, título, idioma, dificuldade de legenda e público;
   - duas sessões são referências externas apenas no nome: `The Odyssey` e `Obsession`;
   - uma sessão é claramente o casal-alvo em VOSTFR;
   - um cartão lateral mostra que as camadas sonoras serão reveladas progressivamente.

3. **Tela das camadas sonoras**
   - seis sons originais são liberados em três passes, dois por vez;
   - para cada som, o jogador escolhe uma descrição entre três alternativas;
   - os rótulos corretos só aparecem depois de cada identificação;
   - as iniciais dos seis rótulos formam o código final.

4. **Tela de síntese**
   - a interface reúne a sessão correta e as seis camadas;
   - o campo de resposta pede o código final;
   - a única resposta válida é `CINEMA`.

5. **Tela de conclusão**
   - confirmação do acerto;
   - exibição do bônus emocional;
   - nenhuma etapa posterior depende do bônus.

## Ativos e dados necessários

### Ativos visuais

| Asset | Uso | Observação |
| --- | --- | --- |
| `grade-sessoes` | Tela principal | Tabela responsiva |
| `icone-vostfr` | Linha da sessão certa | Reforço visual do idioma |
| `icone-casal` | Linha da sessão certa | Reforço do contexto afetivo |
| `icone-legenda` | Linha da sessão certa | Reforço da dificuldade de legenda |
| `cartao-camadas` | Tela de áudio | Reproduz os seis sons em lotes e mostra alternativas textuais |
| `badge-cinema` | Sucesso | Usado apenas na confirmação |

### Dados textuais

| Bloco | Conteúdo obrigatório |
| --- | --- |
| Contexto | Programação noturna fictícia em VOSTFR |
| Referência nominal 1 | `The Odyssey` de Christopher Nolan, apenas como título na grade |
| Referência nominal 2 | `Obsession` de Curry Barker, apenas como título na grade |
| Sessão alvo | a única sessão VOSTFR de casal com legenda média |
| Resultado | `CINEMA` |

### Dados de jogo

| Campo | Valor |
| --- | --- |
| Resposta canônica | CINEMA |
| Limite de erros para 1ª dica | 3 |
| Limite de erros para 2ª dica | 7 |
| Limite de erros para trocar para `Recorrer ao criador` | 12 |

## Dataset fictício completo da programação

A coluna `Camadas sonoras originais` é configuração interna e não aparece na grade antes de a sessão ser escolhida. Exibi-la antecipadamente entregaria o código pelas iniciais.

| Horário | Título | Idioma | Dificuldade de legenda | Público | Camadas sonoras originais | Papel na lógica |
| --- | --- | --- | --- | --- | --- | --- |
| 17:10 | The Odyssey | VO | Básica | Solo | Bruma / Atrito / Sopro / Horizonte / Maré / Areia | Âncora inicial |
| 18:20 | Linha de Maré | VOSTFR | Baixa | Casal | Barulho / Ímã / Norte / Fumaça / Muda / Acorde | Distrator compatível |
| 19:10 | Noite em Vermelho | VOSTFR | Média | Casal | Coro / Impulso / Neblina / Eco / Metrônomo / Acorde | Sessão-alvo |
| 20:40 | Obsession | VF | Alta | Grupo | Pulso / Fenda / Véu / Sombra / Corte / Sal | Âncora final |
| 22:15 | Última Dobra | VOSTFR | Média | Solo | Claque / Índice / Norte / Efeito / Mormaço / Arquejo | Controle de unicidade |

## Dataset dos seis sons originais

Os arquivos devem ser gravados ou sintetizados para o projeto; nenhum trecho de filme ou música comercial pode ser usado.

| Ordem | Conteúdo audível | Alternativas exibidas | Escolha correta | Inicial |
|---:|---|---|---|---|
| 1 | várias vozes sustentando a mesma nota | `Coro` · `Solo` · `Sopro` | Coro | C |
| 2 | um impacto grave único, sem repetição | `Ritmo` · `Impacto` · `Eco` | Impacto | I |
| 3 | casco de madeira, ondas e corda tensionada | `Navio` · `Trem` · `Vento` | Navio | N |
| 4 | uma palma seguida de reverberação longa | `Ruído` · `Eco` · `Silêncio` | Eco | E |
| 5 | cliques regulares em frequência constante | `Chuva` · `Marcha` · `Metrônomo` | Metrônomo | M |
| 6 | plateia batendo palmas | `Passos` · `Porta` · `Aplauso` | Aplauso | A |

Cada som terá transcrição descritiva alternativa para quem não puder ou não quiser reproduzir áudio. A alternativa visual mantém as mesmas três opções.

## Mecânica do enigma

O jogador resolve o desafio em duas camadas:

1. **Camada de grade**
   - The Odyssey aparece antes;
   - Obsession aparece depois;
   - a sessão certa fica entre as duas referências principais;
   - ela é a única que combina VOSTFR, casal e legenda média ao mesmo tempo.

2. **Camada sonora**
   - as camadas do áudio original são reveladas em três passadas;
   - o jogador precisa identificar cada som antes de receber seu rótulo;
   - os nomes e áudios são originais, não trechos de filme;
   - as escolhas corretas formam `CINEMA`:
     - `Coro`
     - `Impulso`
     - `Neblina`
     - `Eco`
     - `Metrônomo`
     - `Acorde`

### Regra determinística de solução

Há uma única sessão que satisfaz simultaneamente:

- idioma `VOSTFR`;
- público `Casal`;
- dificuldade `Média`;
- posição entre as duas referências nominais da grade;
- sequência de camadas que soletra `CINEMA`.

## Solução completa para o implementador

1. Exiba a grade com as cinco sessões.
2. Marque `The Odyssey` e `Obsession` como âncoras nominais, sem mostrar spoilers.
3. Faça o jogador perceber que a sessão-alvo está entre as duas referências.
4. Mostre que apenas uma sessão reúne `VOSTFR + Casal + Média`.
5. Revele os seis sons em três passadas e valide uma alternativa por som.
6. Exiba os rótulos corretos já resolvidos e peça a concatenação das iniciais.
7. Aceite somente a resposta normalizada `CINEMA`.
8. Se houver erro, incremente o contador e aplique as dicas nos limites definidos.
9. Após 12 erros, remova qualquer dica adicional e ofereça apenas `Recorrer ao criador`.

## Respostas aceitas e normalização

### Formas aceitas

- `cinema`
- `CINEMA`
- `Cinema`
- `o cinema`
- `O CINEMA`
- `cinéma`

### Normalização

1. remover espaços nas extremidades;
2. converter para minúsculas;
3. remover acentos;
4. remover pontuação final;
5. remover artigo inicial opcional `o` ou `a` se vier isolado antes da palavra;
6. comparar o resultado final com `cinema`.

Não aceitar:

- `cine`;
- `filme`;
- `sessão`;
- `sala`;
- qualquer frase com mais de uma palavra que não normalize para `cinema`.

## Comportamento de tentativa e dicas

### Após 3 erros

Mostrar a primeira dica:

> Veja a ordem da programação e procure a sessão que fica entre as duas referências nominais.

### Após 7 erros

Mostrar a dica intermediária mais forte:

> A sessão certa é a única VOSTFR de casal com legenda média. As camadas formam uma palavra de seis letras.

### Após 12 erros

Mostrar apenas a ação final:

`Recorrer ao criador`

Regras:

- nunca revelar a resposta;
- nunca exibir a sequência completa das camadas como solução pronta;
- nunca substituir a ação final por nova pista.

## Bônus emocional desbloqueado

**Bônus:** `Noite a dois em VOSTFR`

Descrição:

- celebra a experiência compartilhada de assistir juntos;
- reforça o conforto de legenda na medida certa;
- é apenas um bônus emocional e não é necessário para qualquer etapa futura.

## Notas de implementação

- manter a programação fixa e fictícia;
- não usar mídia licenciada, trailers, trechos de áudio ou spoilers;
- tratar as camadas sonoras como texto original e não como reprodução de obra;
- preservar a ordem das camadas exatamente como documentada;
- manter a referência a The Odyssey e Obsession somente como nomes de programação;
- não depender de dados externos de bilheteria, distribuição ou cartaz.

## Acessibilidade

- a grade precisa ser navegável por teclado;
- as colunas devem ter rótulos claros para leitores de tela;
- as camadas sonoras precisam ter descrição textual;
- o contraste da tabela deve permitir leitura em ambiente escuro;
- o destaque da sessão correta não pode depender só de cor;
- o estado de erro e as dicas devem ser anunciados de forma acessível.

## Casos-limite

- entrada vazia;
- espaços extras e maiúsculas/minúsculas misturadas;
- acentuação em `cinéma`;
- tentativa com artigo inicial;
- repetição do mesmo erro muitas vezes;
- tela estreita em celular;
- quebra de linha dentro da grade;
- carregamento parcial da lista;
- tentativa de usar o nome de um filme como resposta.

## Critérios de aceite

- a programação mostrada é suficiente para resolver a resposta sem ajuda externa;
- só existe uma sessão que satisfaz todos os filtros;
- as camadas da sessão-alvo soletram `CINEMA` na ordem exibida;
- as dicas surgem exatamente nos erros 3, 7 e 12;
- após 12 erros, apenas `Recorrer ao criador` permanece;
- o bônus emocional é visível após o acerto, mas não abre etapa adicional;
- a experiência continua legível e operável em celular.

## Cenários de teste

### Unicidade

1. Marcar a linha de 19:10 como alvo deve ser a única solução válida.
2. `cinema`, `CINEMA`, `Cinema` e `o cinema` devem passar.
3. `cine`, `filme`, `sala`, `obsession` e `the odyssey` devem falhar.
4. Qualquer outra sessão da grade não deve produzir a mesma combinação de filtros.

### Dicas

1. Após 3 erros, a dica sobre a posição entre as duas referências deve aparecer.
2. Após 7 erros, a dica sobre VOSTFR + casal + legenda média deve substituir a anterior.
3. Após 12 erros, apenas `Recorrer ao criador` deve permanecer acionável.

### Mobile

1. A grade deve se adaptar sem horizontal scroll obrigatório em tela estreita.
2. O texto das camadas deve continuar visível em retrato.
3. O botão de resposta deve continuar com área de toque confortável.
4. O usuário deve conseguir ler a tabela e a síntese sem ampliar a tela.
