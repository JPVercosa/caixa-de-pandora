# Segurança e privacidade

## Objetivo realista

O projeto protege a surpresa contra descoberta casual. Ele não tenta resistir a uma análise deliberada do repositório, do JavaScript, do armazenamento local ou das requisições de rede.

## Ativos

- respostas dos desafios ainda não liberados;
- localização da carta;
- fotos, áudios e memórias do casal;
- número de telefone usado no botão de ajuda;
- chave de publicação ou descriptografia;
- integridade do calendário e do progresso.

## Modelo de ameaça

### Considerado

- alguém encontra a URL por acaso;
- a jogadora abre o código-fonte por curiosidade superficial;
- mecanismos de busca indexam textos do repositório ou site;
- o aparelho perde `localStorage`;
- o relógio local está em outro fuso;
- um asset pessoal é compartilhado fora de contexto.

### Aceito

- a jogadora modifica JavaScript ou `localStorage`;
- executa força bruta contra hashes de respostas curtas;
- encontra o repositório público e lê a documentação completa;
- altera o relógio ou chama diretamente um arquivo publicado;

Esses riscos são aceitos porque a experiência depende de boa-fé e ficará disponível por pouco tempo.

## Senha de entrada

- Valor planejado: `bububu`.
- Armazenamento: somente hash no conteúdo publicado.
- Função: reduzir acesso casual e criar uma abertura afetiva.
- Não deve criptografar dados, assinar tokens ou ser reutilizada em qualquer serviço real.
- O modal deve informar erro sem indicar tamanho, posição ou caracteres corretos.

## Respostas

- Nunca armazenar respostas em texto puro no bundle se uma comparação por hash for suficiente.
- Normalizar somente conforme especificado por missão.
- Usar salts diferentes para evitar hashes idênticos entre missões.
- Não enviar tentativas para analytics, logs ou serviços externos.
- Não usar Base64 ou JWT como proteção: ambos permitem ler o conteúdo codificado.

## GitHub Secrets

Secrets podem ser usados dentro do GitHub Actions para preparar um artefato, mas não podem ser copiados para HTML ou JavaScript. Qualquer segredo enviado ao navegador deixa de ser secreto.

Se pacotes futuros forem criptografados no repositório:

- a chave permanece somente no GitHub Secrets;
- o workflow descriptografa em memória temporária;
- apenas o conteúdo já liberado entra no artefato;
- logs não imprimem arquivos, chaves ou comandos com expansão sensível;
- o diretório descriptografado nunca é commitado.

## Conteúdo pessoal

- Preferir ilustrações e textos quando uma foto não agregar valor emocional claro.
- Remover metadados EXIF de imagens antes da publicação.
- Não publicar capturas de WhatsApp com telefone, foto de terceiros ou mensagens não relacionadas.
- Pedir autorização antes de mostrar claramente André, Bia, amigas ou familiares.
- Não incluir código completo da porta em textos visíveis antes da missão de 14/09, embora ele possa aparecer criptografado nos dados necessários.
- Não publicar endereço além do necessário para a experiência final.

## Repositório público

O repositório público contém documentação com spoilers. O nome genérico reduz descoberta casual, mas não garante sigilo. Antes de publicar assets pessoais, revisar o histórico completo e assumir que qualquer commit público pode permanecer acessível mesmo depois de removido.

## Critérios de aceite

- Nenhum token ou chave real aparece no repositório ou artefato.
- Respostas futuras não aparecem em texto puro no site antes da data.
- Nenhuma tentativa digitada sai do dispositivo.
- O site funciona sem analytics e sem cookies de terceiros.
- Toda imagem pessoal foi revisada e teve metadados removidos.
- O encerramento inclui despublicação e revogação de secrets temporários.
