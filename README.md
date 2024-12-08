# React G20 Countries App

## Como Funciona
Você via ser pode visualizar os paises do G20 na barra lateral, podem filtra da forma que desejar.

Ao selecionar um pais você é redirecionado para a página onde suas informações são expostas e você pode ou não cadastrar autoridades.

Na barra lateral você também pode ver seus compromissos e adicionar novos compromissos.

Ao tentar cadastrar seus compromissos você pode cadastrar mais uma autoridade caso ela ainda não estaja cadastrada.

## Descrição
Esta aplicação React é um sistema de gerenciamento de países do G20, autoridades e agendas. Ela permite visualizar informações sobre os países do G20, cadastrar autoridades e gerenciar agendas de compromissos.

## Estrutura do Projeto
public/
    index.html
README.md
src/
    App.js
    components/
        CountryList.js
        Loading.js
        Sidebar.js
    index.js
    pages/
        AgendaForm.js
        Agendas.js
        Authorities.js
        Countries.js
        NotFound.js
    services/
        CountryService.js
    styles.css


## Instalação
Para instalar e configurar a aplicação, siga os passos abaixo:

1. Clone o repositório:
    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd react-at-web
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

## Configuração
A configuração da aplicação é feita principalmente através do arquivo `package.json` e do arquivo de configuração do ESLint `.eslintrc.json`.

### Scripts Disponíveis
No arquivo `package.json`, você encontrará os seguintes scripts:

- `start`: Inicia a aplicação em modo de desenvolvimento.
    ```sh
    npm start
    ```

- `build`: Cria uma versão otimizada para produção da aplicação.
    ```sh
    npm run build
    ```

- `test`: Executa os testes da aplicação.
    ```sh
    npm test
    ```

- `eject`: Ejecta a configuração do Create React App.
    ```sh
    npm run eject
    ```

### Configuração do ESLint
O arquivo `.eslintrc.json` contém a configuração do ESLint para o projeto:
```json
{
  "parser": "@typescript-eslint/parser"
}