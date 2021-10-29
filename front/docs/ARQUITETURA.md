ARQUITETURA
===========

### Environments (.env)

| NAME                 | DEFAULT    | REQUIRED | DESCRIPTION               |
|----------------------|------------|----------|---------------------------|
| REACT_APP_ENV        | production | false    | production or development |
| REACT_APP_API_HOST   |            | true     |                           |
| REACT_APP_SENTRY_KEY |            | false    | DNS public from sentry.io |

### Scripts do package.json

| Comando         | Descrição                                      | Quem usa                           |
|-----------------|------------------------------------------------|------------------------------------|
| dev             | inicia o react-scripts-ts                      | Docker (dev) / desenvolvedor       |
| build           | gera os arquivos transpilados                  | Docker (durante build de produção) |
| eject           | ejeta os arquivos do webpack (não recomendado) | desenvolvedor                      |
| webpack-analyze | use para verificar o tamanho o bundle final    | devensolvedor                      |
| update-base     | use atualizar a base do app                    | devensolvedor                      |

### Sistema de pastas

* assets: pasta aonde contem as imagens, o css global e a configuração do tema.
* components: componentes do React.
    * Dialogs: componentes de dialogs gerais do sistema.
    * Layout: componentes que servem como base estrutura para o layout.
    * Pages: componentes que são as tela separadas pelas áreas.
    * Shared: components genéricos para auxiliar.
* declarations: custom typings para o Typescript.
* errors: classes de erro.
* formatters: funções para formatar dado.
* helpers: funções genéricas que auxiliam na tarefa.
  * rxjs-operators: operadores do RxJs criados para o projeto.
* hooks: hooks customizados
* interfaces: interfaces gerais e respostas da api.
* services: responsável pela lógica de nogocio e a comunicação com o servidor.

---

Se um component precisar de um sub-component este deve ficar na mesma pasta/subpasta do component pai.

```bash
# Estrura de pasta de componens
component1
  - index.tsx
  - subcomponent1.1.tsx
  - subcomponent1.2
    - index.ts
    - subcomponent1.2.1.tsx
component2
```

### Boas práticas e pontos a serem observados

* O serviços são responsáveis pela **lógica de negócio, comunicação do servidor e guardar o estado geral**.
* Sempre que utilizar um RxJs Observable, utilize o operator **logError**, caso de um erro ele logará esse erro 
  no sentry.io, **mas ele não tratará o erro**.