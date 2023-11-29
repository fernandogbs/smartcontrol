# Smartcontrol

Esse projeto está utilizando do [Angular CLI](https://github.com/angular/angular-cli) versão 16.2.3.

## Servidor de desenvolvimento

Rode no terminal `ng serve --open` ou `ng serve` para criar um servidor de desenvolvimento. Na barra de pesquisa utilize pela URL: `http://localhost:4200/`. A aplicação vai carregar automáticamente e renderizar o conteúdo.

## Abrir banco de dados local e utilizar a FAKE API REST

Como banco de dados local, o arquivo está utilizando um .json para gravar dados. Para rodar o servidor é necessário o uso do json-server;
`npm i json-server` para instalar o servidor do banco de dados;
Dentro da pasta principal, utilize o comando `json-server --watch src/assets/data/db.json` e após isso atualize a aplicaçõ no navegador. Então já deve gerar o conteúdo gravado.

