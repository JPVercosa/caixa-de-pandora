# Desafio 09 — Vale-Praia

Especificação fechada do voucher 09, pensada para ser implementada sem consultas externas e sem depender de qualquer outra resposta da trilha.

## Metadados

| Campo | Valor |
| --- | --- |
| Data | 2026-09-09 |
| Sequência | 09 |
| Resposta revelada | PRAIA |
| Dificuldade | Média |
| Duração esperada | 15 a 20 minutos |
| Pré-requisito | Fluxo padrão de vouchers carregado; nenhuma resposta de outro voucher é necessária |

## Propósito narrativo e regra de isolamento

Este desafio é a primeira leitura clara da fuga desejada durante o inverno parisiense: três atlas curtos, três países costeiros e uma única experiência comum. O jogador precisa perceber que o destino não é um país, uma cidade nem uma categoria de presente diferente. A resposta final é sempre a experiência de ir à praia.

Regra de isolamento:

- este arquivo é autossuficiente;
- nenhum outro voucher precisa ser lido para resolver o enigma;
- nenhuma resposta de outro voucher deve aparecer na interface, nas dicas ou nos dados;
- as referências bônus servem só como clima narrativo e não alteram a solução.

## Fluxo exato da tela do jogador

1. **Tela inicial**
   - título neutro: `Três atlas, uma fuga`;
   - subtítulo: `Três atlas, um inverno e uma mesma fuga`;
   - botão principal: `Iniciar`;
   - botão secundário: `Dica` somente se ainda não houver erro suficiente para a dica automática;
   - estado de erro com contador visível.

2. **Atlas 1**
   - a bandeira brasileira começa coberta por seis placas;
   - duas placas são removidas inicialmente e outra é removida após cada palpite incorreto de país;
   - somente depois de identificar `BRASIL` aparecem o contorno do mapa, o litoral e o bloco climático.

3. **Atlas 2**
   - repete a mecânica de placas com a bandeira grega;
   - após `GRÉCIA`, mostra mapa fragmentado por ilhas, costa e chamada sobre uma viagem de aniversário.

4. **Atlas 3**
   - repete a mecânica com a bandeira croata;
   - após `CROÁCIA`, mostra a faixa adriática e uma referência curta a Dubrovnik;
   - Trono de Ferro e perus permanecem exclusivamente no bônus posterior.

5. **Tela de síntese**
   - a interface resume os três cartões em uma linha única;
   - o jogador digita a resposta no campo `Qual é a experiência comum?`;
   - o sistema aceita a resposta normalizada;
   - acerto leva à tela de conclusão.

6. **Tela de conclusão**
   - confirmação clara do acerto;
   - exibição do bônus emocional desbloqueado;
   - sem dependência futura desse bônus.

## Ativos e dados necessários

### Ativos visuais

| Asset | Uso | Observação |
| --- | --- | --- |
| `flag-brasil` | Card 1 | Bandeira em alta legibilidade |
| `mapa-brasil` | Card 1 | Silhueta com litoral destacado |
| `flag-grecia` | Card 2 | Bandeira em alta legibilidade |
| `mapa-grecia` | Card 2 | Silhueta com ilhas destacadas |
| `flag-croacia` | Card 3 | Bandeira em alta legibilidade |
| `mapa-croacia` | Card 3 | Silhueta com Adriático destacado |
| `icone-praia` | Síntese e sucesso | Usado apenas como reforço visual |

### Dados textuais

| Bloco | Conteúdo obrigatório |
| --- | --- |
| Contexto climático | Paris no inverno é fria e cinzenta |
| Brasil | Rio, litoral, calor, mar |
| Grécia | aniversário, ilhas, costa, mar |
| Croácia | Dubrovnik, litoral, ilha da referência de fantasia, turkeys soltos como detalhe bônus |
| Síntese | tudo aponta para uma experiência de litoral |

### Dados de jogo

| Campo | Valor |
| --- | --- |
| Resposta canônica | PRAIA |
| Limite de erros para 1ª dica | 3 |
| Limite de erros para 2ª dica | 7 |
| Limite de erros para trocar para `Recorrer ao criador` | 12 |

### Sequência fixa de revelação

| Atlas | Resposta intermediária | Primeiros fragmentos | Fragmentos seguintes | Confirmação visual |
|---|---|---|---|---|
| 1 | `BRASIL` | parte do círculo azul e fundo verde | losango amarelo, faixa branca, estrelas, restante verde | mapa com litoral do Rio destacado |
| 2 | `GRÉCIA` | duas faixas azuis/brancas | outras faixas, canto azul, cruz branca, restante | mapa com ilhas e costa destacadas |
| 3 | `CROÁCIA` | parte do escudo quadriculado | faixas vermelha/branca/azul, coroa do escudo, restante | mapa com costa adriática destacada |

As respostas intermediárias aceitam formas sem acento e nomes em português, inglês, francês ou espanhol. Elas não são preservadas nem usadas em outras missões.

## Mecânica do enigma

O desafio usa uma leitura de atlas em três etapas:

1. **Etapa Brasil**
   - identificar a bandeira progressivamente;
   - confirmar `BRASIL` para revelar mapa, Rio, litoral, calor e mar.

2. **Etapa Grécia**
   - identificar `GRÉCIA` pelos fragmentos;
   - revelar mapa, ilhas, aniversário, costa e mar.

3. **Etapa Croácia**
   - identificar `CROÁCIA` pelos fragmentos;
   - revelar Dubrovnik, faixa adriática e costa acessível.

### Regra determinística de solução

O conjunto dos três cartões foi desenhado para ter uma interseção única:

- todos os países citados têm litoral ou acesso marítimo relevante;
- todos os bônus narrativos descrevem deslocamento de férias, não de trabalho;
- nenhum cartão oferece pista para outra categoria de voucher;
- a única palavra que descreve a experiência comum com precisão é `praia`.

## Solução completa para o implementador

1. Apresente o contexto de Paris no inverno sem mostrar o nome do vale.
2. Execute as três revelações de bandeira na ordem da tabela, validando Brasil, Grécia e Croácia.
3. Após cada país correto, mostre seu mapa e seus dados costeiros.
4. Faça a síntese visual sem usar ícone de praia antes da resposta final.
5. Aceite somente a resposta normalizada `PRAIA`.
6. Conte palpites intermediários e finais incorretos no mesmo contador de dicas.
7. Após 12 erros, preserve o progresso, desabilite novos palpites e ofereça apenas `Recorrer ao criador`.

## Respostas aceitas e normalização

### Formas aceitas

- `praia`
- `Praia`
- `PRAIA`
- `a praia`
- `A PRAIA`

### Normalização

1. remover espaços nas extremidades;
2. converter para minúsculas;
3. remover acentos;
4. remover pontuação final;
5. remover artigo inicial opcional `a` se vier isolado antes da palavra;
6. comparar o resultado final com `praia`.

Não aceitar:

- plural `praias`;
- sinônimos como `mar` ou `beira-mar`;
- nomes próprios de lugares;
- respostas com múltiplas palavras fora da forma normalizada acima.

## Comportamento de tentativa e dicas

### Após 3 erros

Mostrar a primeira dica, curta e objetiva:

> Procure o elemento comum nos três cartões: litoral, calor e fuga do inverno.

### Após 7 erros

Mostrar uma dica intermediária mais forte:

> O alvo não é o país, a cidade nem a ilha. É a experiência de ir ao mar.

### Após 12 erros

Substituir qualquer dica restante por apenas um botão:

`Recorrer ao criador`

Regras:

- nunca revelar a resposta;
- nunca mostrar a letra inicial correta;
- nunca transformar a ação final em pista nova.

## Bônus emocional desbloqueado

**Bônus:** `Memória de sol merecida`

Descrição:

- reforço afetivo de escape ao calor;
- celebra a sensação de férias e alívio;
- não é necessário para resolver, revisitar ou avançar em qualquer etapa posterior.

## Notas de implementação

- manter os três cartões na mesma ordem sempre;
- não depender de serviços de clima nem de mapas externos;
- deixar os bônus como texto fixo, não como ramificações;
- preservar a resposta canônica em maiúsculas internamente;
- não expor a regra de normalização na interface do jogador;
- se houver animação, ela deve ser leve e opcional.

## Acessibilidade

- usar `alt` descritivo para cada bandeira e mapa;
- não depender apenas de cor para indicar litoral;
- garantir leitura por teclado e foco visível;
- manter contraste suficiente entre texto e fundo;
- exibir a síntese final em texto legível por leitor de tela;
- informar o contador de erros com atualização acessível.

## Casos-limite

- entrada vazia;
- espaços extras antes e depois;
- letras maiúsculas e minúsculas misturadas;
- acentuação digitada em teclado móvel;
- tentativa repetida após acerto;
- viewport estreito em celular;
- modo paisagem e modo retrato;
- carregamento parcial das imagens dos cartões.

## Critérios de aceite

- o jogador consegue resolver usando apenas os três atlas desta página;
- a resposta correta é única e normalizada como `PRAIA`;
- as dicas aparecem exatamente nos erros 3, 7 e 12;
- após 12 erros, só existe `Recorrer ao criador`;
- o bônus emocional aparece no sucesso, mas não abre nova etapa;
- a experiência é usável no celular sem perda de informação;
- nenhum outro voucher é necessário para entender o enigma.

## Cenários de teste

### Unicidade

1. Entrar com `praia` deve passar.
2. Entrar com `PRAIA` deve passar.
3. Entrar com `a praia` deve passar.
4. Entrar com `mar`, `praias`, `rio`, `dubrovnik` ou qualquer país deve falhar.

### Dicas

1. Após 3 erros, a primeira dica deve aparecer.
2. Após 7 erros, a dica intermediária deve substituir a anterior.
3. Após 12 erros, só o botão `Recorrer ao criador` deve permanecer.

### Mobile

1. Em largura estreita, os três cartões precisam empilhar sem cortar texto.
2. O campo de resposta precisa continuar visível sem zoom obrigatório.
3. Os botões precisam ser acionáveis com toque confortável.
4. A leitura do resumo final precisa continuar completa em uma única coluna.
