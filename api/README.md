# API - Mentoria DIO

Para utilizar o projeto, serão necessários os seguintes itens:

* Visual Studio Code (ou outro que preferir)
* NodeJS (>= v15)
* Yarn (>= 1.22)
* Docker (opcional)

## Para que serve este repositório
Vocês são livres para adicionar, corrigir, remover funcionalidades. O intuito deste repositório é realmente aprender e errar em ambiente seguro.
Divirtam-se!

## Passo a passo (sem Docker)
1 - Primeiramente você já precisa ter o MySQL contratado e pre-configurado. Crie um banco de dados chamado **mentoriadio**.

```
CREATE DATABASE `mentoriadio`;
```

> Se não sabe como contratar um banco de dados MySQL, ``recomendo revistar a Mentoria 05 que falamos sobre o MySQL`` e serviços que oferecem servidores no formato Trial.


2 - Acesse o arquivo **ormconfig.json** e coloque as credenciais do seu banco de dados MySQL.


```json
{
    "type": "mysql",
    "host": "<endereco do servidor>",
    "port": <porta>,
    "username": "<usuario>",
    "password": "<senha>",
    "database": "<banco de dados>",
    "entities": ["./src/entity/*.{js,ts}"]
}
```
3 - Após estas mudanças, abra o terminal e execute os seguintes comandos:
```javascript
yarn install // Vai instalar as dependencias
yarn start // Iniciará a nossa API
```


## Passo a passo (utilizando Docker)
Utilizar o Docker é bem vantajoso, pois ele poupará tempo de contratar um servidor MySQL, já que ele roda um MySQL direto na sua máquina.

> Se está nesta parte do tutorial, acreditamos que já tenha o Docker instalado e rodando.

1 - Verifique se o Docker está rodando
```
docker ps
```
Se listar os conteiners (ou nenhum deles) sem erros, ele está rodando.

2 - Dentro do diretório da API, rode o seguinte comando
```sh
docker-compose up
```
Aguarde um momento até que no terminal apareça que está pronto para receber conexões.

3 - Confira o arquivo **ormconfig.json** se está com esta configuração abaixo:
```json
{
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",
    "password": "example",
    "database": "mentoriaDIO",
    "entities": ["./src/entity/*.{js,ts}"]
}
```

4 - Se sim, basta rodar os seguintes comandos:
```javascript
yarn install // Vai instalar as dependencias
yarn start // Iniciará a nossa API
```

Sua API rodará, e se conectará no banco de dados local do MySQL.
# Dúvidas?
* [linkedin.com/diogomainardes](linkedin.com/diogomainardes)
* [diogo.mainardes@eduzz.com](diogo.mainardes@eduzz.com)

