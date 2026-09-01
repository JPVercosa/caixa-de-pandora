# Site

Esta pasta contém somente o artefato estático publicado no GitHub Pages.

## Desenvolvimento local

Pré-requisito: Node.js 20 ou superior. Não há dependências para instalar.

```powershell
npm run dev
```

Abra `http://localhost:4173`.

Para testar antes das datas reais, o servidor lê variáveis de ambiente e as injeta somente durante o desenvolvimento:

```powershell
$env:PANDORA_PREVIEW='1'
$env:PANDORA_PREVIEW_DATE='2026-09-05T12:00:00+02:00'
$env:PANDORA_SKIP_PASSWORD='1'
npm run dev
```

Também é possível usar a URL diretamente:

```text
http://localhost:4173/?preview=1&date=2026-09-05T12:00:00%2B02:00&skipPassword=1&reset=1
```

## Pontos fáceis de editar

- `config/constants.js`: datas, contato, senha em hash, textos globais e caminhos dos ímãs.
- `assets/magnets/question.svg`: placeholder atual dos ímãs.
- `challenges/mission-01.js`, `mission-03.js` e `mission-05.js`: conteúdo das missões iniciais.
- `styles/main.css`: identidade visual e responsividade.

O navegador não possui variáveis de ambiente. Por isso, os controles locais são injetados pelo `tools/dev-server.mjs` ou passados por query string; o site publicado ignora essas opções.
