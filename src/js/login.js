document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;

    try {
    const res = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha })
    });

    if (!res.ok) {
        const erro = await res.text();
        throw new Error("Erro no login: " + erro);
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);

    } catch (err) {
    alert(err.message);
    }
});
