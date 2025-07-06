# Frontend - StartupLogistica

Este README explica como configurar e executar apenas a **parte frontend** do projeto StartupLogistica, que consiste em páginas estáticas HTML, CSS e JavaScript para autenticação e gerenciamento de usuários.

---

## Descrição do Projeto

O frontend de StartupLogistica fornece uma interface simples e responsiva para:

* Autenticação de usuários via JWT
* Registro público de novos usuários
* Listagem, edição e exclusão de perfis de usuários

**Objetivo:** Exemplificar a construção de interfaces interativas que consomem uma API REST com autenticação JWT.

---

## Metodologia Utilizada

Durante o desenvolvimento do frontend utilizamos o **Kanban** no GitHub Projects:

1. **A Fazer**: backlog de funcionalidades e ajustes de UI
2. **Em Progresso**: tarefas sendo implementadas
3. **Concluído**: features finalizadas e testadas

A cada alteração significativa, movemos o cartão correspondente no quadro Kanban.

---

## Estrutura de Diretórios

```
/public
├── login.html       # Tela de login com botão “Cadastrar-se”
├── cadastro.html    # Tela de cadastro público de novos usuários
├── usuarios.html    # Listagem de usuários, edição em modal e exclusão
└── css
    └── styles.css   # Estilos compartilhados
└── js
    ├── login.js     # Lógica de login e redirecionamento
    ├── cadastro.js  # Lógica de cadastro de usuários
    └── usuarios.js  # Fetch de dados, modal de edição e exclusão
```

---

## Dependências

* **Fonte:** Noto Sans (Google Fonts)
* **Servidor Estático:** Pode usar Live Server (VS Code), http-server (Node.js) ou Python `http.server`

---

## Instruções para Execução

1. **Clone ou copie** apenas a pasta `public` do repositório para sua máquina.
2. Abra um terminal na pasta raiz do frontend.
3. Inicie um servidor estático:

   * **Live Server (VS Code):** botão direito em qualquer `.html` → **Open with Live Server**
   * **http-server (Node.js):**

     ```bash
     npm install -g http-server
     http-server . -c-1
     ```
   * **Python 3:**

     ```bash
     python3 -m http.server 5500
     ```
4. Acesse no navegador:

   * `http://127.0.0.1:5500/login.html` → tela de login
   * `http://127.0.0.1:5500/cadastro.html` → tela de cadastro
   * Após login, será redirecionado para `usuarios.html` → listagem

---

## Funcionalidades

1. **Login** (`login.html`)

   * Envia `POST /api/v1/login`, armazena token e redireciona para listagem
   * Botão **Cadastrar-se** leva para cadastro

2. **Cadastro** (`cadastro.html`)

   * Envia `POST /api/v1/users` sem necessidade de token
   * Após sucesso, redireciona para login

3. **Listagem de Usuários** (`usuarios.html`)

   * Exibe tabela via `GET /api/v1/users?page=0&limit=1000`
   * Header mostra “Bem-vindo, {nome}” via `GET /api/v1/user`
   * Botões **Novo Usuário**, **Editar**, **Deletar**, **Sair**

---

### Customização de Estilo

* **Cores:** fundo escuro (`#201b2c`), destaque em verde (`#00ff88`)
* **Responsividade:** media queries para telas <950px e <600px

---

**Observação:** Certifique-se de que o backend esteja rodando em `http://localhost:8080/api/v1` com CORS configurado para `http://127.0.0.1:5500`.
