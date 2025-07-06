document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Você precisa estar logado.");
    window.location.href = "login.html";
    return;
  }

  // Buscar dados do usuário logado
  fetch("http://localhost:8080/api/v1/user", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Token inválido");
      return res.json();
    })
    .then(data => {
      document.getElementById("usuarioLogado").textContent = `Logado como: ${data.name}`;
    })
    .catch(err => {
      console.error(err);
      localStorage.removeItem("token");
      alert("Sessão expirada. Faça login novamente.");
      window.location.href = "login.html";
    });

  // Cadastro de novo usuário
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("emailCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;

    try {
      const res = await fetch("http://localhost:8080/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name: nome, email, password: senha }),
      });

      if (!res.ok) {
        const erro = await res.text();
        throw new Error("Erro no cadastro: " + erro);
      }

      alert("Usuário cadastrado com sucesso!");
      document.getElementById("registerForm").reset();
    } catch (err) {
      alert(err.message);
    }
  });

});
