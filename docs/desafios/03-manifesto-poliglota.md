# 03 — Manifesto Poliglota

| Campo | Valor |
|---|---|
| Data | 2026-09-03 |
| Sequência | 03 |
| Resposta revelada | VALE |
| Dificuldade | Alta |
| Duração esperada | 10–14 minutos |
| Pré-requisito | Nenhum |

## Propósito narrativo e regra de isolamento

Este desafio é um manifesto multilíngue de extração semântica. O jogador precisa ler quatro blocos, um em cada idioma, identificar a palavra canônica em cada bloco e montar a resposta final com as iniciais.

Regra de isolamento: o desafio deve ser resolvível sozinho. Ele não pode citar, sugerir nem depender de respostas de outros vouchers, e não pode usar qualquer vocabulário que antecipe conteúdos posteriores.

## Fluxo exato do jogador

1. A tela inicial apresenta o manifesto e explica, em uma frase, que quatro blocos linguísticos precisam ser combinados.
2. O jogador avança para uma tela com quatro painéis:
   - português brasileiro;
   - inglês;
   - espanhol;
   - francês.
3. Cada painel contém uma pista semântica e quatro palavras candidatas no mesmo idioma; apenas uma satisfaz exatamente a definição.
4. O sistema pede a montagem final de um código com quatro letras.
5. O jogador envia `VALE`.
6. Se o código estiver correto, a tela de sucesso confirma a conclusão e exibe o bônus emocional opcional.
7. Se houver erro, o sistema mostra feedback progressivo sem revelar os quatro termos corretos.

## Materiais e dados necessários

- Quatro painéis textuais, um por idioma.
- Um campo único para o código final.
- Um botão principal de envio.
- Um bloco de dica progressiva.
- Um bloco de bônus emocional na tela de sucesso.

### Texto exato dos quatro painéis

| Idioma | Texto exibido | Opções exibidas | Solução | Letra |
|---|---|---|---|---|
| PT-BR | “Depressão natural alongada entre elevações.” | vale · planície · cume · encosta | vale | V |
| EN | “Formal permission indicating that a proposed action may proceed.” | approval · refusal · delay · review | approval | A |
| ES | “Fidelidad firme hacia una persona, grupo o causa.” | lealtad · duda · ruptura · cambio | lealtad | L |
| FR | “Principe d'impartialité qui vise un traitement juste et adapté.” | équité · faveur · hasard · excès | équité | E |

## Mecânica do quebra-cabeça

O desafio é de extração semântica e montagem de formato:

1. cada painel é resolvido por significado e por eliminação dentro do banco de quatro opções;
2. cada resposta canônica tem uma única inicial útil;
3. as iniciais, na ordem dos painéis, formam `VALE`;
4. o sistema valida somente o código final, não as palavras intermediárias.

Para evitar ambiguidade:

- os textos e bancos de opções devem ser exatamente os descritos acima;
- a ordem dos painéis não deve mudar;
- a extração é sempre da primeira letra da solução canônica;
- acentos não alteram a letra-base da resposta final.

## Solução completa para o implementer

1. Renderize os quatro painéis na ordem PT-BR, EN, ES, FR.
2. Não misture os idiomas nem embaralhe os blocos.
3. Em cada bloco, o jogador seleciona a única opção que satisfaz integralmente a definição.
4. Extraia a primeira letra de cada palavra canônica:
   - `vale` → `V`
   - `approval` → `A`
   - `lealtad` → `L`
   - `équité` → `E`
5. Concatene as quatro letras na ordem fixa.
6. Compare o resultado normalizado com `VALE`.
7. Em caso de acerto, finalize o desafio e mostre o bônus emocional.

## Resposta final e normalização

### Resposta aceita

- `VALE`

### Variações aceitas

- `vale`
- `V A L E`
- `V-A-L-E`
- `V.A.L.E.`

### Normalização

- ignorar caixa alta/baixa;
- remover espaços, hífens e pontos entre as letras;
- aceitar somente a sequência de quatro letras `VALE`;
- rejeitar qualquer resposta com letras extras.

## Comportamento de tentativas

- **Após 1 a 2 erros:** mensagem neutra de erro, sem dica adicional.
- **Após 3 erros:** primeira dica de método: “Observe que cada painel quer uma palavra canônica, não uma tradução livre.”
- **Após 7 erros:** dica intermediária mais forte: “Pegue a primeira letra da solução de cada idioma, na ordem dos blocos.”
- **Após 12 erros:** substituir a ajuda por um único botão **“Recorrer ao criador”**.
  A partir daí, o sistema não pode mostrar as palavras corretas nem as letras finais.

## Bônus emocional desbloqueado

O bônus emocional é a sequência de três meses de recusas de apartamento, seguida pela conquista do apartamento da Rue Léopold Bellan na primeira visita.

Este trecho existe apenas como recompensa afetiva.
Ele não é necessário para resolver, validar ou reutilizar o desafio, e não deve virar pista para nenhum conteúdo futuro.

## Notas de implementação

- Manter os textos exatamente como definidos para garantir extração reproduzível.
- Não alterar a ordem dos painéis.
- Não permitir que a resolução dependa de dicionário externo, internet ou tradução automática.
- O sistema deve validar apenas o código final.
- Não revelar as soluções canônicas antes do acerto.
- O bônus emocional deve aparecer apenas na tela de sucesso.

## Acessibilidade

- Cada painel precisa ter rótulo de idioma explícito.
- O enunciado deve ser lido em ordem lógica por leitores de tela.
- O campo do código deve ter instrução curta e objetiva.
- O contraste precisa ser alto.
- O layout deve funcionar sem recorte em telas estreitas.
- Erros e dicas devem ser anunciados por tecnologia assistiva.

## Casos-limite

- Maiúsculas e minúsculas misturadas devem ser aceitas.
- Separadores entre letras devem ser ignorados.
- Espaços extras nas bordas devem ser ignorados.
- Qualquer sequência diferente de `VALE` deve falhar.
- O jogador não pode avançar com três letras corretas e uma errada.
- O bônus emocional não pode interferir na validação.
- O botão **“Recorrer ao criador”** não pode entregar a solução.

## Critérios de aceite

- Cada painel gera uma única solução canônica e a extração é reproduzível.
- A concatenação das iniciais produz apenas `VALE`.
- A resposta final aceita apenas o código correto normalizado.
- As dicas progressivas aparecem exatamente nos limiares definidos.
- O desafio funciona em desktop e mobile sem perda de legibilidade.

## Cenários de teste

1. **Resposta correta direta**
   Entrada: `VALE`
   Resultado esperado: sucesso.

2. **Resposta correta com separadores**
   Entrada: `V-A-L-E`
   Resultado esperado: sucesso.

3. **Resposta correta em caixa baixa**
   Entrada: `vale`
   Resultado esperado: sucesso.

4. **Erro simples antes da primeira dica**
   Entrada: `VELO`
   Resultado esperado: erro neutro.

5. **Terceiro erro**
   Resultado esperado: exibição da primeira dica de método.

6. **Sétimo erro**
   Resultado esperado: exibição da dica intermediária mais forte.

7. **Décimo segundo erro**
   Resultado esperado: substituição da ajuda pelo botão **“Recorrer ao criador”**.

8. **Viewport móvel 360px**
   Resultado esperado: sem rolagem horizontal, com quatro painéis legíveis e campo de código utilizável por toque.
