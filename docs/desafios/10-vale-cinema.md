# Desafio 10 — Vale-Cinema

## Contrato da missão

Missão isolada sobre uma programação fictícia em VOSTFR. O jogador identifica uma sessão por filtros e resolve seis descrições sonoras textuais para extrair `CINEMA`. O áudio pode ser oferecido como reforço, mas a transcrição é o canal obrigatório e suficiente para resolver.

| Campo | Valor |
|---|---|
| Data | 2026-09-10 |
| Dificuldade | Média-alta |
| Duração | 18–25 min |
| Resposta | `CINEMA` |

## Fluxo fechado

`intro → schedule → sound-1..6 → synthesis → success`. Em `schedule`, o jogador seleciona uma linha; só `Noite em Vermelho` (19:10) libera os sons. A seleção não é considerada correta até cumprir idioma `VOSTFR`, público `Casal`, legenda `Média` e posição entre `The Odyssey` (17:10) e `Obsession` (20:40). Sons são apresentados na ordem 1–6, um por vez, com três alternativas; seleção correta fixa o rótulo e libera o seguinte.

Persistir `{ sessionId, soundAnswers, errors, completed }` durante a sessão. Recarregar restaura; `Reiniciar` limpa. Erros de sessão, som e resposta final compartilham `errors`. O bônus só aparece em `success`.

## Dataset da programação

| Hora | Título | Idioma | Legenda | Público |
|---|---|---|---|---|
| 17:10 | The Odyssey | VO | Básica | Solo |
| 18:20 | Linha de Maré | VOSTFR | Baixa | Casal |
| 19:10 | Noite em Vermelho | VOSTFR | Média | Casal |
| 20:40 | Obsession | VF | Alta | Grupo |
| 22:15 | Última Dobra | VOSTFR | Média | Solo |

As referências nominais são apenas texto fictício de programação; não carregar filmes, trailers ou dados externos.

## Dataset sonoro textual

| # | Descrição acessível | Opções | Correta | Inicial |
|---:|---|---|---|---|
| 1 | várias vozes sustentando a mesma nota | `Coro`, `Solo`, `Sopro` | Coro | C |
| 2 | impacto grave único, sem repetição | `Ritmo`, `Impacto`, `Eco` | Impacto | I |
| 3 | casco de madeira, ondas e corda tensionada | `Navio`, `Trem`, `Vento` | Navio | N |
| 4 | palma seguida de reverberação longa | `Ruído`, `Eco`, `Silêncio` | Eco | E |
| 5 | cliques regulares em frequência constante | `Chuva`, `Marcha`, `Metrônomo` | Metrônomo | M |
| 6 | plateia batendo palmas | `Passos`, `Porta`, `Aplauso` | Aplauso | A |

O código é a concatenação das iniciais das seis escolhas corretas: `CINEMA`. A tela não exibe iniciais antes de cada escolha correta, mas mostra o rótulo já resolvido.

## Mecânica, validação e resposta

Aceitar sessão somente se a linha for exatamente a de 19:10 e todas as seis escolhas forem corretas na ordem. A seleção de uma alternativa errada não avança e incrementa erro. Validar o campo final apenas em `synthesis`. Normalizar NFD, remover acentos, artigo inicial `O/A` isolado, pontuação e espaços; aceitar `CINEMA`, `cinema`, `o cinema` e `cinéma`; rejeitar `cine`, `filme`, títulos e frases extras.

## Solução e unicidade

A enumeração da tabela e das seis escolhas deve produzir uma única solução: a sessão de 19:10 e o código `CINEMA`.

## Dicas, acessibilidade e casos

- erro 3: `Procure a sessão entre as duas referências nominais.`
- erro 7: `A sessão certa é a única VOSTFR de casal com legenda média. As camadas formam uma palavra de seis letras.`
- erro 12: somente `Recorrer ao criador`, sem resposta ou sequência revelada.

Testar unicidade dos filtros, cada alternativa errada, ordem dos sons, recarga, reset, final antes de completar, erro 3/7/12, teclado, leitor de tela e viewport 360px. O alvo deve permanecer legível sem depender de cor ou áudio.

## Bônus

Em `success`, mostrar o epílogo fixo `Noite a dois em VOSTFR`; é decorativo e não participa da solução.


## Critérios de aceite e testes

- Apenas a sessão de 19:10 satisfaz simultaneamente os filtros documentados.
- As seis respostas corretas, na ordem, produzem `CINEMA`; não é possível avançar com alternativa errada.
- A resposta final, dicas, bloqueio, persistência, reset, teclado, leitor de tela e viewport 360px seguem o contrato acima.
- Testar áudio indisponível: a transcrição acessível deve manter o fluxo resolvível.

## Assets obrigatórios

Usar tabela HTML para a programação e seis cartões de som com botão de reprodução opcional e transcrição sempre visível. Não usar mídia licenciada, trailer ou dado externo; a ausência de áudio não pode bloquear a resolução.
