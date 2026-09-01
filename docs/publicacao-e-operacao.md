# Publicação e operação

## Objetivo

Publicar o site no GitHub Pages, liberar as missões no calendário francês, acompanhar falhas durante os quinze dias e retirar a experiência depois do encerramento.

## Ambientes

| Ambiente | Uso | Conteúdo pessoal |
| --- | --- | --- |
| Local | desenvolvimento e testes completos | permitido |
| Preview | ensaio privado por URL temporária ou execução local | somente cópias aprovadas |
| Produção | experiência entregue à jogadora | somente conteúdo final |

O projeto não manterá um ambiente permanente de homologação público com respostas legíveis.

## Fluxo de publicação planejado

1. Executar validações de Markdown, links e consistência documental.
2. Executar testes dos solucionadores e da interface.
3. Gerar o artefato estático.
4. Incluir somente conteúdo permitido para a data de publicação.
5. Fazer upload do artefato com GitHub Actions.
6. Publicar com GitHub Pages.
7. Executar um smoke test da URL pública em celular.

O workflow deverá aceitar tanto agendamento quanto execução manual. A execução manual é a recuperação oficial para atraso ou falha de cron.

## Calendário operacional

- Horário canônico: `Europe/Paris`.
- Uma liberação pode ocorrer à meia-noite local ou em outro horário único definido antes do ensaio final.
- A data exibida no site e a data usada pelo workflow precisam vir da mesma configuração.
- Alterações de calendário exigem atualização simultânea da configuração e da tabela em [visão geral](visao-geral.md).

## Checklist anterior ao lançamento

- [ ] Todos os desafios têm solução única comprovada.
- [ ] Todas as respostas aceitas foram testadas com e sem acentos.
- [ ] Nenhum bônus revela resposta futura.
- [ ] A carta ainda está na lateral interna direita da caixa de correios.
- [ ] A senha `bububu` funciona em aba anônima.
- [ ] O site funciona no aparelho real da jogadora ou em dispositivo equivalente.
- [ ] O link de “Recorrer ao criador” abre a conversa correta.
- [ ] Existe acionamento manual do deploy.
- [ ] Existe cópia local dos assets pessoais.

## Rotina diária

1. Confirmar que a nova missão apareceu no horário esperado.
2. Abrir a missão em um dispositivo sem estado anterior.
3. Testar uma resposta errada e uma variante correta.
4. Verificar imagens, áudios e bônus.
5. Confirmar que a missão seguinte continua bloqueada.
6. Observar mensagens do criador sem alterar a solução durante o jogo, salvo erro real.

## Incidentes

### Deploy atrasado

Executar o workflow manualmente, validar a URL e não compensar liberando missões futuras.

### Progresso perdido

Oferecer uma ação de recuperação que marque somente missões que a jogadora comprovar ter concluído. Não armazenar respostas completas como prova.

### Enigma inválido ou ambíguo

Corrigir a documentação primeiro, adicionar um caso de teste, publicar a correção e comunicar apenas que houve ajuste técnico.

### Asset pessoal indisponível

Usar a alternativa textual prevista no documento da missão. O desafio nunca pode depender do bônus.

## Encerramento

Após a descoberta da carta:

1. preservar uma cópia local do artefato final;
2. remover ou substituir dados pessoais no histórico público, se necessário;
3. desabilitar o workflow agendado;
4. despublicar o GitHub Pages;
5. decidir se o repositório continuará público como documentação ou será arquivado/privado;
6. revogar secrets usados exclusivamente no projeto.
