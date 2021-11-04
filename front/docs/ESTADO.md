Gerenciamento de Estado
=======================

Utilizamos 3 maneira de gerenciar o estado da aplicação: 
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [Context API](https://pt-br.reactjs.org/docs/context.html)
* [RxJS](https://rxjs.dev/guide/overview)


Mas cada um tem seu caso de uso: 

## Redux (padrão)
* Recomendado para estados globais.
* Para componentes de “página” usamos uma única vez, nesse caso iniciar e limpar usando o useEffect.
* Possibilidade de simplificar os services e usar promises.

## Context API 
* Recomendado para estados de contexto de componentes usados mais de uma vez.
* Tomar cuidado com performance: 
* Usar useMemo no valor do contexto.
* User useContextSelector para diminuir renders.

## RxJs
* Usar conforme a necessidade e conhecimento.
* Ótimo para observar e reagir a mudança de estados complexas.
* Brilha com o operadores.
