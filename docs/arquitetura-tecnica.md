# Arquitetura técnica

## Estado do documento

Esta arquitetura documenta a primeira implementação funcional. O escopo atual contém a fundação do site e as missões 01, 03 e 05; as demais continuam como placeholders.

## Restrições

- Hospedagem no GitHub Pages.
- Repositório público.
- Aplicação estática, mobile-first e sem banco de dados.
- Vida útil operacional de aproximadamente quinze dias.
- Sem dependência de autenticação real ou cadastro da jogadora.
- Conteúdo futuro não deve aparecer de forma casual na interface antes da data.

## Componentes implementados no primeiro incremento

### Interface estática

HTML, CSS e JavaScript no navegador serão responsáveis por:

- modal de entrada com a senha afetiva;
- calendário e painel de imãs;
- renderização das etapas de cada missão;
- contagem de tentativas e exibição de dicas;
- normalização e hash das respostas;
- persistência local;
- bônus emocionais;
- acessibilidade e adaptação ao celular.

Nenhum framework é usado. A implementação utiliza JavaScript nativo, ES modules e CSS separado. `site/index.html` é apenas o shell; a entrada está em `site/app.js`, e componentes visuais ficam em `site/components/`.

### Conteúdo por missão

Cada missão será descrita por dados, separada da camada de apresentação. O contrato mínimo planejado é:

| Campo | Função |
| --- | --- |
| `id` | Identificador estável e sem informação secreta |
| `unlockAt` | Instante de liberação no fuso `Europe/Paris` |
| `title` | Nome exibido após a liberação |
| `stages` | Etapas, instruções, recursos e validações intermediárias |
| `answerHashes` | Hashes das variantes finais normalizadas |
| `hints` | Duas dicas, associadas a 3 e 7 erros |
| `bonus` | Conteúdo liberado somente após a conclusão |
| `magnet` | Estado visual desbloqueado no painel |

O primeiro incremento implementa `site/challenges/mission-01.js`, `mission-03.js` e `mission-05.js`, registrados em `site/challenges/registry.js`. Cada módulo monta seu fluxo e usa o shell compartilhado sem concentrar toda a lógica em HTML.

### Estado local

O navegador deverá persistir, por missão:

- concluída ou pendente;
- etapa atual;
- número de tentativas inválidas;
- dicas já abertas;
- bônus já visualizado.

A senha liberada e a versão do conteúdo também serão armazenadas. Nenhuma resposta digitada será mantida após a validação.

O estado deve conter uma versão. Mudanças incompatíveis poderão migrar ou reiniciar somente a missão afetada, sem apagar conclusões anteriores.

## Liberação por data

- O horário canônico será calculado com `Europe/Paris`, e não com o fuso configurado no aparelho.
- A interface esconderá missões futuras e informará a próxima data sem revelar título, resposta ou categoria.
- Como o cliente controla relógio e código, essa barreira é narrativa, não de segurança.
- Um workflow agendado poderá publicar apenas os arquivos já liberados, reduzindo exposição casual de conteúdo futuro.

## Validação de respostas

1. Receber a resposta apenas no navegador.
2. Aplicar a normalização definida em cada missão.
3. Calcular SHA-256 com o salt público daquela missão.
4. Comparar com a lista de hashes aceitos.
5. Em sucesso, persistir a conclusão e liberar o bônus.
6. Em erro, incrementar tentativas sem registrar o texto digitado.

Hash no cliente evita respostas legíveis no código, mas não impede força bruta. Esse limite é aceito pelo modelo de ameaça.

## Estrutura de diretórios planejada

```text
/
├── README.md
├── docs/
│   ├── desafios/
│   └── *.md
├── src/                 # somente na fase de implementação
│   ├── assets/
│   ├── challenges/
│   ├── styles/
│   └── scripts/
├── tests/               # validadores e provas de unicidade
└── .github/workflows/   # build, testes, liberação e deploy
```

## Desenvolvimento local

`tools/dev-server.mjs` serve `site/` sem dependências externas. Variáveis `PANDORA_PREVIEW`, `PANDORA_PREVIEW_DATE`, `PANDORA_SKIP_PASSWORD` e `PANDORA_PORT` são injetadas somente no servidor local. Veja [site/README.md](../site/README.md).

## Decisões deliberadamente adiadas

- Ferramenta de build, se alguma, além do deploy direto de `site/`.
- Formato JSON ou módulos JavaScript para desafios.
- Estratégia de criptografia dos pacotes futuros no repositório público.
- Domínio personalizado.

Essas decisões só devem ser tomadas quando a primeira missão for transformada em dados executáveis e os custos de complexidade puderem ser avaliados.
