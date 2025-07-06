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


