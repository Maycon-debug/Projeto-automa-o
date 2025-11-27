# Projeto de Automação de Testes - Cypress

Projeto de automação de testes end-to-end (E2E) utilizando Cypress para testar funcionalidades do site [Automation Exercise](https://automationexercise.com/).

## 📋 Sobre o Projeto

Este projeto contém testes automatizados desenvolvidos com Cypress para validar funcionalidades de um site de e-commerce, incluindo testes de cadastro de usuários, login e outras funcionalidades.

## 🛠️ Tecnologias Utilizadas

- **Cypress** (v15.6.0) - Framework de automação de testes E2E
- **JavaScript** - Linguagem de programação
- **Node.js** - Ambiente de execução

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
```

2. Entre na pasta do projeto:
```bash
cd projeto-cypress
```

3. Instale as dependências:
```bash
npm install
```

## ▶️ Como Executar os Testes

### Executar testes em modo headless (sem interface gráfica)
```bash
npm test
```

### Abrir o Cypress Test Runner (interface gráfica)
```bash
npm run test:open
```

### Executar testes em modo headed (com navegador visível)
```bash
npm run test:headed
```

### Executar um arquivo de teste específico
```bash
npm run test:spec "cypress/e2e/automation-exercise.cy.js"
```

## 📁 Estrutura do Projeto

```
projeto-cypress/
├── cypress/
│   ├── e2e/                    # Testes end-to-end
│   │   └── automation-exercise.cy.js
│   ├── fixtures/               # Dados de teste
│   │   └── example.json
│   └── support/                # Comandos customizados e configurações
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js           # Configuração do Cypress
├── package.json                # Dependências do projeto
└── README.md                   # Documentação do projeto
```

## 🧪 Testes Implementados

### TC01: Cadastro do Usuário
- Acessa o site Automation Exercise
- Realiza cadastro de novo usuário
- Valida criação da conta com sucesso
- Realiza logout

## 👥 Integrantes do Projeto

- **Maycon Santos**
- **Jonatan Batista**
- **Victor Santos**
- **Erivelton José**

## 📝 Licença

Este projeto está sob a licença ISC.

## 🔗 Links Úteis

- [Documentação do Cypress](https://docs.cypress.io/)
- [Site Automation Exercise](https://automationexercise.com/)

