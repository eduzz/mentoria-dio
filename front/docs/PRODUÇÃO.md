PRODUÇÃO
========

**É NECESSÁRIO CRIAR UMA CONTA NO DOCKER.HUB E CONFIGURAR UM REPOSITÓRIO**

### Gerando a imagem

Para criar uma imagem de produção basta rodar:

```bash
yarn docker:release # ou npm run docker:release
```

Ele gerará a imagem e dará push no repositório do docker.hub. É possível ativar
o Bitbucket Pipelines para fazer todos esse processo automático, deixei um arquivo de exemplo.

### Levantando

Basta criar um arquivo docker-compose.yml no servidor e colocar as configurações e rodar:

```bash
docker-compose up -d
```

A aplicações irá iniciar, sugiro utilizar o **NGINX** para criar um proxy reverso.

**ATENÇÃO:** diferente da api, o front não tem acesso o environments,
**ele utilizará os que foram setados no .env.production durante o processo do docker build**, 
sendo necessário rebuildar a aplicação e gerar uma nova imagem.

### Atualizando

Feito a imagem basta entrar no ambiente de produção e rodar o comando abaixo:

```bash
docker-compose pull
docker-compose up -d
```