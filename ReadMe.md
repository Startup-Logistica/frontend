# Frontend - StartupLogistica

Este README explica como configurar e executar apenas a **parte frontend** do projeto StartupLogistica, que consiste em páginas estáticas HTML, CSS e JavaScript para autenticação e gerenciamento de usuários.

---

## Estrutura de Diretórios

```
/public
├── login.html       # Tela de login com botão “Cadastrar-se”
├── cadastro.html    # Tela de cadastro público de novos usuários
├── usuarios.html    # Listagem de usuários, edição em modal e exclusão
└── js
    ├── login.js     # Lógica de login e redirecionamento
    ├── cadastro.js  # Lógica de cadastro de usuários
    └── usuarios.js  # Fetch de dados, modal de edição e exclusão
```

---

## Dependências

* **Font**: Noto Sans (importada via Google Fonts)
* **Servidor Estático**: [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code, ou qualquer servidor estático (http-server, Python `http.server`, etc.)

---

## Instruções de Execução

1. **Clone ou copie** apenas a pasta `public` do repositório para sua máquina.
2. Abra um terminal na pasta raiz do frontend.
3. Inicie um servidor estático:

   * **Live Server (VS Code)**: Botão direito em qualquer `.html` → **Open with Live Server**
   * **http-server (Node.js)**:

     ```bash
     npm install -g http-server
     http-server . -c-1
     ```
   * **Python 3**:

     ```bash
     python3 -m http.server 5500
     ```
4. Acesse no navegador:

   * `http://127.0.0.1:5500/login.html`
     → Tela de login
   * `http://127.0.0.1:5500/cadastro.html`
     → Tela de cadastro público
   * Após login bem-sucedido, você será redirecionado para `usuarios.html`
     → Listagem de usuários

---

## Funcionalidades

1. **Login** (`login.html`):

   * Captura email e senha, faz `POST /api/v1/login`.
   * Armazena token JWT em `localStorage` e redireciona para `usuarios.html`.
   * Botão **Cadastrar-se** leva para `cadastro.html`.

2. **Cadastro** (`cadastro.html`):

   * Formulário público para criar novos usuários (`POST /api/v1/users`).
   * Após sucesso, redireciona para login.
   * Botão **Voltar** leva para a lista de usuários (se logado).

3. **Listagem** (`usuarios.html`):

   * Faz `GET /api/v1/users?page=0&limit=1000` para buscar todos os usuários.
   * Exibe em tabela com Colunas: Nome, Email, Ações.
   * Header com **Bem-vindo, {nome do usuário logado}** (via `GET /api/v1/user`).
   * Botão **Sair** limpa token e redireciona para login.
   * Botão **Novo Usuário** leva para cadastro.
   * **Editar** (modal): atualiza nome/email (`PATCH /api/v1/users/{id}`).
   * **Deletar**: exclui usuário (`DELETE /api/v1/users/{id}`) com confirmação.

---

## Customização de Estilo

* **Cores**: fundo escuro (`#201b2c`), cartões e header em roxo escuro (`#2f2841`), botões verdes (`#00ff88`).
* **Tipografia**: Noto Sans, pesos 400/700.
* **Responsividade**: media queries para telas <950px e <600px.

---

## Observações

* Certifique-se de que o backend esteja rodando em `http://localhost:8080/api/v1` e com CORS habilitado para `http://127.0.0.1:5500`.
* Ajuste URLs de `fetch()` em `js/*.js` caso o endereço do backend seja diferente.

Pronto! Com isso, você tem tudo para iniciar o frontend de usuário autenticado e gerenciar usuários via API.🚀
