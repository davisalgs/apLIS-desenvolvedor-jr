# Projeto apLIS

Este repositório contém a entrega do teste prático para Desenvolvedor Junior. A aplicação consiste em um sistema de gerenciamento básico de laboratório, dividido em três camadas principais, consumindo um único banco de dados MySQL:

- **Frontend (React/Vite)**: SPA moderno e responsivo com Sidebar de navegação.
- **Backend Node.js**: API RESTful responsável pelo CRUD de Pacientes.
- **Backend PHP**: API RESTful construída com arquitetura MVC, responsável pelo CRUD de Médicos.

## Como rodar o projeto localmente

### 1. Banco de Dados
Certifique-se de ter um servidor MySQL rodando na sua máquina.
*   Crie um banco de dados (ex: `aplis_db`) com as tabelas de `pacientes` e `medicos`.
*   Atualize as credenciais do seu banco de dados:
    *   No Node.js: Edite o arquivo `/backendjs/.env` ou `database.js`.
    *   No PHP: Edite o arquivo `/backendphp/src/config/database.php`.

### 2. Backend Node.js (Porta 3000)
Abra um terminal e execute os comandos abaixo para instalar as dependências e subir a API de Pacientes:
```bash
cd backendjs
npm install
npm run dev
```

### 3. Backend PHP (Porta 8000)
Abra um novo terminal (diferente do Node) e execute o servidor embutido do PHP apontando para a pasta `src`:
```bash
cd backendphp
php -S localhost:8000 -t src
```

### 4. Frontend React (Porta 5173)
Abra um terceiro terminal e suba o ambiente visual:
```bash
cd app
npm install
npm run dev
```

Após rodar os 3 processos, abra seu navegador no endereço: **http://localhost:5173**

