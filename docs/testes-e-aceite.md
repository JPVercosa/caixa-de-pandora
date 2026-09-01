# Testes e critérios de aceite

## Estratégia

O projeto exige dois tipos de prova independentes:

1. **Prova do enigma:** os dados levam a uma solução única, justa e reproduzível.
2. **Prova do produto:** o site libera, valida, persiste e apresenta a missão corretamente.

Uma interface funcional não compensa um enigma ambíguo; uma solução lógica correta não compensa uma experiência inacessível.

## Validação documental

Cada arquivo de desafio deve conter:

- resposta e variantes aceitas;
- caminho completo da solução;
- justificativa de unicidade;
- textos das duas dicas;
- comportamento depois de 12 erros;
- assets necessários e alternativas;
- bônus e declaração de não dependência futura;
- critérios de aceite específicos.

Links internos e datas devem coincidir com [visão geral](visao-geral.md).

## Provas de unicidade

Desafios combinatórios deverão ter um pequeno solucionador automatizado durante a implementação:

- otimização do iFood: enumerar rotas válidas e exigir exatamente uma;
- sessão de cinema: enumerar sessões e exigir exatamente uma compatível;
- rotação: calcular todos os tempos de chegada e rejeitar empates;
- SET: enumerar trios e exigir um conjunto válido por tabuleiro;
- lógica da joia: enumerar atribuições e exigir uma solução;
- extrações poliglotas: testar índices e resultado esperado;
- última milha: validar destino e orientação sem interpretação alternativa.

O dataset deve falhar no teste se uma alteração criar zero ou múltiplas soluções.

## Validação de respostas

Testar para toda missão:

- resposta canônica;
- caixa alta e baixa;
- acentos presentes e ausentes quando permitido;
- espaços extras;
- pontuação acidental;
- sinônimos explicitamente aceitos;
- resposta parcial rejeitada;
- resposta de outra missão rejeitada;
- texto vazio e caracteres incomuns sem erro da aplicação.

## Datas e fuso

Simular:

- um segundo antes da liberação;
- instante exato;
- um segundo depois;
- navegador em fuso do Brasil;
- navegador em fuso da França;
- mudança de horário de verão;
- relógio inválido ou API de data indisponível;
- atualização da página no momento da liberação.

## Estado e recuperação

- Fechar e reabrir após cada etapa.
- Atualizar a página durante um desafio.
- Concluir, limpar apenas estado de sessão e confirmar persistência planejada.
- Corromper a versão de estado e confirmar recuperação segura.
- Garantir que concluir uma missão não conclui outra.
- Garantir que um bônus aberto não altera dicas futuras.

## Dicas e tentativas

Para cada missão:

- erros 1 e 2: apenas feedback temático;
- erro 3: liberar dica metodológica;
- erros 4 a 6: manter dica disponível;
- erro 7: liberar dica intermediária;
- erros 8 a 11: manter ambas;
- erro 12: liberar “Recorrer ao criador”;
- nenhum estado pode mostrar a solução automaticamente.

## Acessibilidade e dispositivos

- Larguras mínimas de 320 px sem rolagem horizontal estrutural.
- Operação completa por toque e teclado.
- Foco visível e ordem de navegação lógica.
- Texto alternativo para imagens informativas.
- Transcrição ou alternativa visual para áudio.
- Formas ou rótulos além de cor.
- Respeito a `prefers-reduced-motion`.
- Botão de silenciar persistente.
- Contraste adequado em estado normal, erro e sucesso.

Testar ao menos em Chrome Android, Safari iOS e um navegador desktop moderno.

## Ensaio completo

Antes do lançamento, executar uma simulação de 1 a 15/09 com relógio controlado:

1. entrar com senha correta e incorreta;
2. resolver todas as missões usando a documentação;
3. acionar todas as dicas;
4. abrir todos os bônus;
5. trocar o fuso do dispositivo;
6. simular atualização e retorno ao site;
7. validar que `CARTA` só aparece em 14/09;
8. validar que a caixa e a lateral direita só aparecem em 15/09;
9. executar o checklist de retirada.

## Definição de pronto

Uma missão está pronta somente quando sua especificação está aprovada, o solucionador confirma unicidade, a interface passa nos testes de resposta/dicas e o fluxo foi executado em um celular real.
