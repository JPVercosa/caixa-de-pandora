# Documentação do Baú de Afetos

Esta pasta é a fonte de verdade do projeto. O site só deve começar a ser implementado quando os documentos abaixo estiverem revisados e os desafios tiverem solução única comprovada.

## Documentos de produto e experiência

- [Visão geral](visao-geral.md): objetivo, narrativa, público, calendário e regras de isolamento.
- [Catálogo de desafios](desafios/README.md): índice e contrato obrigatório de cada missão.

## Documentos técnicos

- [Arquitetura técnica](arquitetura-tecnica.md): componentes, dados, estados e limites da aplicação estática.
- [Publicação e operação](publicacao-e-operacao.md): GitHub Pages, liberações, monitoramento e retirada.
- [Segurança e privacidade](seguranca-e-privacidade.md): modelo de ameaça, respostas, senha e conteúdo pessoal.
- [Testes e critérios de aceite](testes-e-aceite.md): validação dos enigmas, aplicação, dispositivos e operação.
- [Guia local do site](../site/README.md): execução local e variáveis de prévia.

## Ordem de trabalho

1. Revisar a visão geral e confirmar a sequência das missões.
2. Finalizar cada especificação em `docs/desafios/`.
3. Provar que desafios lógicos possuem uma única solução.
4. Revisar arquitetura, segurança e operação.
5. Implementar primeiro a fundação do site e depois uma missão por vez.
6. Executar o ensaio completo com datas simuladas antes da publicação.

## Regra de mudança

Toda alteração de mecânica, resposta, data ou bônus deve ser feita primeiro na documentação. O código posterior deverá referenciar a versão documentada, nunca introduzir regras exclusivas sem registrá-las aqui.
