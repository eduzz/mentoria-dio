DESENVOLVIMENTO
===============

### Ambiente

* Node
* Yarn (pode ser alterado para npm, mas vai precisar alterar os scripts também)
* Docker com docker-compose
* Visual Studio Code (Recomendado mas não obrigatório)

### Iniciando 

```bash
na raíz do projeto executar os comandos abaixo:

yarn install # ou npm install

node ./init.js # apenas caso não tenha iniciado o projeto ainda

yarn dev # ou docker-compose up caso queira usar docker durante o dev
```

Pronto, agora é só codar que ele reiniciará a aplicação com as alterações.

### Environmetns (.env)

Se precisar alterar algum valor, crie .env.development.local para sobrepor os valores.  
Caso alterados será necessário parar o script e rodar novamente.

### Typescript

Ele auxilia muito durante o desenvolvimento, mas alguns packges não vem com suas
definitions junto, entao primerio basta instalar com o comando abaixo. 

```bash
yarn add --dev @types/lib # ou npm install --save-dev @types/lib
```

Caso não encontre basta adicionar no arquivo declarations/extra.d.ts o conteudo abaixo,
assim você poderá utilizar ela mas sem suporte a verificação de tipagem.

```ts
declare module 'lib-nova';
```

### Git 

Antes de cada commit ele irá verificar se tem algum erro de Typescript ou do TSLint,
isso evita um commit que quebre o ambiente de outra pessoa.

Para mais informações veja a documentação do 
[husky](https://github.com/typicode/husky)