# Desafio 07 — Vale Ifood

## Metadados

| Campo | Valor |
|---|---|
| Data | 2026-09-07 |
| Sequência | 07 |
| Resposta revelada | IFOOD |
| Dificuldade | Média |
| Duração esperada | 15 a 20 minutos |
| Pré-requisito | Desafio anterior da trilha liberado; a rota é independente de respostas passadas |

## Propósito narrativo e regra de isolamento

Este desafio fecha a faixa de entrega com um problema de roteirização last-mile que parece operacional, não abstrato. O jogador precisa ler janelas de tempo, capacidade, incompatibilidade e um trecho bloqueado para concluir uma ordem única de visitas.

Regra de isolamento: este arquivo não pode depender de qualquer resposta de voucher anterior. Ele deve funcionar sozinho, com todos os dados necessários presentes aqui. A única ligação externa permitida é o desbloqueio de sequência da trilha, nunca a reutilização de uma solução.

## Fluxo exato da experiência

1. **Tela inicial do desafio**
   - Título neutro: `Operação última milha`.
   - Subtítulo: `Organize a rota com janela de tempo e capacidade`.
   - Botão principal: `Montar rota`.

2. **Tela de briefing**
   - Explica que o objetivo é ordenar os nós de entrega.
   - Mostra a capacidade do veículo e a restrição de incompatibilidade.
   - Informa que um trecho da malha está bloqueado.

3. **Tela do mapa/dataset**
   - O jogador vê a tabela dos nós.
   - A interface mostra a matriz simplificada de deslocamento.
   - O sistema deixa claro que a sequência final forma uma palavra.

4. **Montagem da rota**
   - O jogador seleciona os nós em ordem.
   - Cada seleção é validada contra janela de tempo, capacidade e restrições.
   - O motor rejeita rota que viole o bloqueio ou a incompatibilidade.

5. **Tela de conclusão**
   - Exibe a rota correta.
   - Mostra a palavra final `IFOOD`.
   - Libera o bônus emocional e a navegação adiante.

## Ativos e dados necessários

### Ativos visuais

- Mapa minimalista do bairro/cluster de entregas.
- Tabela responsiva dos nós.
- Indicadores de janela de tempo.
- Sinalização de trecho bloqueado.
- Estado visual de rota válida, inválida e concluída.

### Dados

- Matriz de viagem entre os nós.
- Janelas de tempo.
- Demanda de cada entrega.
- Capacidade total do veículo.
- Par de incompatibilidade.
- Texto do sucesso e do bônus.

## Mecânica do puzzle

### Modelo do problema

O desafio usa uma versão fechada de roteirização last-mile. Não é um TSP genérico; é um caso determinístico com cinco nós e um único caminho viável.

Condições globais:

- veículo sai do hub às 08:00;
- capacidade total: **9 unidades**;
- total de demanda das cinco entregas: **9 unidades**;
- serviço em cada parada: **4 minutos**;
- um arco da malha está bloqueado;
- há um par de nós incompatíveis quando visitados em sequência inadequada.

### Dataset completo

| Código | Nome da parada | Demanda | Janela de atendimento | Serviço | Observação |
|---|---|---:|---|---:|---|
| I | Instituto Central | 1 | 08:00–08:08 | 4 min | primeira parada candidata |
| F | Feira Norte | 2 | 08:12–08:22 | 4 min | entrega de volume médio |
| O1 | Oficina Sul | 2 | 08:27–08:37 | 4 min | acesso só pelo corredor alternativo |
| O2 | Ótica Leste | 1 | 08:42–08:52 | 4 min | item frágil |
| D | Doca Final | 3 | 08:57–09:07 | 4 min | última entrega do circuito |

### Matriz de deslocamento em minutos

| De / Para | I | F | O1 | O2 | D |
|---|---:|---:|---:|---:|---:|
| **Hub** | 2 | 5 | 8 | 12 | 16 |
| **I** | — | 4 | **bloqueado** | 6 | 10 |
| **F** | 4 | — | 4 | 6 | 10 |
| **O1** | 8 | 4 | — | 4 | 7 |
| **O2** | 12 | 6 | 4 | — | 4 |
| **D** | 16 | 10 | 7 | 4 | — |

### Incompatibilidade explícita

- `F` e `O2` não podem aparecer como par consecutivo.
- Motivo narrativo: o processamento de conferência do lote de feira interrompe a fila de leitura do scanner da ótica.

## Caminho determinístico de solução

A rota correta é:

**I → F → O1 → O2 → D**

Ela gera a palavra final:

**IFOOD**

### Prova por eliminação

1. **I é obrigatória como primeira parada**
   - Se o jogador começar por `F`, o percurso `Hub → F` leva 5 minutos, e o serviço termina às 08:09.
   - Isso já faz `I` vencer o limite das 08:08.
   - Começar por `O1`, `O2` ou `D` também falha por janela.
   - Logo, `I` é o único início possível.

2. **Após I, F é a única segunda parada viável**
   - `I → O1` está bloqueado.
   - `I → O2` faz a visita cair tarde demais para preservar a janela de `F`.
   - `I → D` também destrói a janela de `F` e ainda consome o relógio sem retorno útil.
   - Portanto, a segunda parada só pode ser `F`.

3. **Após F, O1 é forçada**
   - Se `O2` vier antes de `O1`, o atendimento em `O2` empurra o relógio até depois das 08:46.
   - Nesse cenário, `O1` passa do fim de janela às 08:37.
   - `D` também não pode vir antes de `O1`, porque `D` precisa ficar por último no circuito viável.
   - Logo, `O1` é a terceira parada.

4. **Após O1, O2 é a única opção antes de D**
   - `D` ainda pode ser atendida depois de `O1`, mas se ela vier antes, `O2` perde a janela.
   - Como o desafio exige atender todos os nós uma única vez, `O2` precisa acontecer antes de `D`.
   - Então a quarta parada é `O2` e a quinta é `D`.

5. **A incompatibilidade também fecha as portas laterais**
   - A tentativa `F → O2` como vizinhos consecutivos é inválida.
   - Isso remove a única leitura alternativa que poderia parecer plausível num uso apressado da matriz.

Esse encadeamento deixa uma única ordem possível.

## Walkthrough completo para o implementador

1. Fixe o hub de saída em `08:00`.
2. Carregue o dataset acima exatamente como está.
3. Considere o arco `I → O1` como bloqueado e não navegável.
4. Implemente a validação de rota por etapas:
   - checar janela antes de aceitar o nó;
   - somar deslocamento + serviço;
   - verificar capacidade global;
   - verificar incompatibilidade de adjacência.
5. Ao concatenar os códigos dos cinco nós aceitos na ordem final, gere `IFOOD`.
6. Ao concluir, mostre a sequência e bloqueie novas edições da mesma tentativa.

## Resposta final aceita e normalização

### Variantes aceitas

- `IFOOD`
- `iFood`
- `I FOOD`
- `I-FOOD`

### Normalização

- converter para maiúsculas;
- remover espaços, hífens e pontuação;
- comparar com `IFOOD`.

Qualquer outra sequência normalizada deve falhar.

## Comportamento das tentativas e dicas

| Erros acumulados | Comportamento |
|---|---|
| 1 a 2 | Rejeição discreta da rota e preservação do estado |
| 3 | Primeira dica de método: `Procure a primeira parada que ainda permite cumprir as janelas seguintes.` |
| 4 a 6 | Reforço de leitura da malha, sem revelar a ordem |
| 7 | Dica intermediária forte: `O nó inicial é o único que cabe antes do fechamento de I; depois dele, o trecho bloqueado elimina a segunda escolha óbvia.` |
| 8 a 11 | Apenas reforço operacional genérico |
| 12 ou mais | Mostrar somente a ação `Recorrer ao criador` |

Regra obrigatória: nenhuma dica pode revelar a sequência completa ou o código final antes do acerto.

## Bônus emocional desbloqueado

Ao concluir o desafio, o jogador desbloqueia um bônus emocional com três imagens/legendas:

- `Encarnado Burgers`;
- `Cumbuca Wraps`;
- a cena de ela arrastando ele para um `Taco Bell` em Rotterdam.

Esse bônus é apenas narrativo e não participa de nenhuma regra futura. Ele não altera a solução, não entra na normalização e não deve ser consultado por outro voucher.

## Notas de implementação, acessibilidade e casos extremos

### Implementação

- Mantenha o dataset estático para garantir reprodutibilidade.
- Não embaralhe os nós.
- Exiba os tempos em formato local consistente.
- Não permita que uma tentativa parcial “conserte” uma janela já violada.

### Acessibilidade

- A tabela deve ser navegável por teclado.
- Cada nó precisa ter rótulo textual e estado anunciado por leitor de tela.
- O bloqueio do arco precisa ter descrição clara.
- Em mobile, a matriz pode rolar horizontalmente sem cortar os cabeçalhos.

### Casos extremos

- Entrada duplicada: rejeitar.
- Nó repetido: rejeitar.
- Ordem parcialmente correta, mas com janela quebrada: rejeitar.
- Tentativa que ignora o arco bloqueado: rejeitar imediatamente.
- Sequência com códigos corretos, mas espaços/hífens diferentes: aceitar após normalização.
- Após 12 erros, nunca exibir a palavra final; apenas `Recorrer ao criador`.

## Critérios de aceite

- A tabela completa está presente e contém os cinco nós.
- O arco `I → O1` está explicitamente bloqueado.
- A incompatibilidade `F`/`O2` está documentada.
- A capacidade total e as demandas fecham em 9 unidades.
- Existe exatamente uma ordem viável.
- A ordem viável concatena para `IFOOD`.
- O comportamento de dicas segue os limiares 3, 7 e 12.
- O desafio permanece usável em telas pequenas.

## Cenários de teste

1. **Fluxo feliz**
   - Dados `I → F → O1 → O2 → D`, o sistema aceita e conclui.

2. **Bloqueio de arco**
   - Tentar `I → O1` deve falhar imediatamente.

3. **Janela quebrada**
   - Tentar começar por `F` ou `O2` deve ser rejeitado por janela.

4. **Incompatibilidade**
   - Tentar `F → O2` como vizinhos consecutivos deve falhar.

5. **Normalização**
   - `iFood`, `I-FOOD` e `I FOOD` devem normalizar para a mesma resposta aceita.

6. **Mobile**
   - Em tela estreita, a tabela e a matriz continuam legíveis e navegáveis.

7. **Isolamento**
   - Alterações em outro voucher não podem alterar janela, arco bloqueado, resposta ou bônus deste arquivo.
