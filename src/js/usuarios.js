// js/usuarios.js

const tabelaBody = document.querySelector("#tabelaUsuarios tbody");
const modal = document.getElementById("modal");
let idUsuarioEditando = null;

function carregarUsuarios() {
  const token = localStorage.getItem("token");
  fetch("http://localhost:8080/api/v1/users?page=0&limit=1000", {
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(res => {
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      return res.json();
    })
    .then(data => {
      tabelaBody.innerHTML = "";
      data.content.forEach(user => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>
            <button class="btn-login"
                    onclick="abrirModal('${user.id}', '${user.name}', '${user.email}')">
              Editar
            </button>
            <button class="btn-login"
                    style="background: #ff4f4f; margin-left: 10px;"
                    onclick="deletarUsuario('${user.id}')">
              Deletar
            </button>
          </td>
        `;
        tabelaBody.appendChild(linha);
      });
    })
    .catch(err => console.error("Erro ao carregar usuários", err));
}

function abrirModal(id, nome, email) {
  idUsuarioEditando = id;
  document.getElementById("editNome").value = nome;
  document.getElementById("editEmail").value = email;
  modal.style.display = "flex";
}

function fecharModal() {
  modal.style.display = "none";
  idUsuarioEditando = null;
}

async function salvarEdicao() {
  const token = localStorage.getItem("token");
  const nome = document.getElementById("editNome").value;
  const email = document.getElementById("editEmail").value;

  try {
    const res = await fetch(`http://localhost:8080/api/v1/users/${idUsuarioEditando}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name: nome, email })
    });
    if (!res.ok) {
      const erro = await res.text();
      throw new Error("Erro ao atualizar: " + erro);
    }
    alert("Usuário atualizado com sucesso!");
    fecharModal();
    carregarUsuarios();
  } catch (err) {
    alert(err.message);
  }
}

function deletarUsuario(id) {
  if (!confirm("Tem certeza que deseja deletar este usuário?")) return;

  const token = localStorage.getItem("token");
  fetch(`http://localhost:8080/api/v1/users/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao deletar usuário");
      alert("Usuário deletado com sucesso!");
      carregarUsuarios();
    })
    .catch(err => alert("Erro ao deletar: " + err.message));
}

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Você precisa estar logado.");
    return window.location.href = "login.html";
  }

  // Botão de logout
  document.getElementById("logoutBtn")
          .addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });

  // Busca o usuário atual e atualiza o cabeçalho
  fetch("http://localhost:8080/api/v1/user", {
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(res => {
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      return res.json();
    })
    .then(u => {
      document.getElementById("bemVindo")
              .innerText = `Bem-vindo, ${u.name}`;
    })
    .catch(err => console.error("Erro ao buscar usuário", err));

  // Carrega lista de usuários e vincula o botão Salvar
  carregarUsuarios();
  document.getElementById("salvarEdicao")
          .addEventListener("click", salvarEdicao);
});
