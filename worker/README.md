# Worker - Mentoria DIO

Para utilizar o projeto, serão necessários os seguintes itens:

* Visual Studio Code (ou outro que preferir)
* NodeJS (>= v15)
* Yarn (>= 1.22)
* Docker

## Para que serve este repositório
Vocês são livres para adicionar, corrigir, remover funcionalidades. O intuito deste repositório é realmente aprender e errar em ambiente seguro.
Divirtam-se!

## Passo a passo
> Para utilizar, é necessário ter o Docker instalado em sua máquina

Precisamos inicialmente deixar uma instancia do RabbitMQ rodando em nossa máquina, para isso, vá até ao diretório raiz (./mentoria-dio), e rode o comando 

```sh
docker-compose up rabbitmq
```
Aguarde um momento até que no terminal apareça que está pronto para receber conexões.

No arquivo **worker/settings.ts**, verifique se as seguintes constantes estão definidas

```javascript
export const RABBIT_HOST= 'amqp://localhost';
export const SENDGRID_TOKEN = ''; // APIKey adquirida do Sendgrid
```

4 - Se tudo certo, execute o seguinte comando
```javascript
yarn install // Vai instalar as dependencias
yarn start // Iniciará a nossa API
```

Seu worker rodará, e se quiser visualizar o painel do RabbitMQ com as filas, acesse `http://localhost:15673` e utilize as credenciais `username: guest` e `password: guest`. 


# Dúvidas?
* [linkedin.com/diogomainardes](linkedin.com/diogomainardes)
* [diogo.mainardes@eduzz.com](diogo.mainardes@eduzz.com)

