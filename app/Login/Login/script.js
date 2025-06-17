var form = document.getElementById("formulario");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var dados = new FormData(form);
  var ul = document.getElementById("validacao");
  ul.innerHTML = "";

  var email = dados.get("email").trim();
  var senha = dados.get("senha").trim();

  var msgs = [];

  if (email.length === 0) {
    msgs.push("Informe o email");
  }

  if (senha.length === 0) {
    msgs.push("Informe a senha");
  }

  var usuariosPermitidos = [
    { email: "julian@gmail.com", senha: "12345678" },
    { email: "caio@gmail.com", senha: "12345678" },
    { email: "windson@gmail.com", senha: "12345678" },
  ];

  var usuarioValido = usuariosPermitidos.some(function (usuario) {
    return usuario.email === email && usuario.senha === senha;
  });

  if (msgs.length === 0 && !usuarioValido) {
    msgs.push("Email ou senha inválidos.");
  }

  if (msgs.length > 0) {
    ul.classList.remove("off");
    msgs.forEach(function (msg) {
      var li = document.createElement("li");
      li.textContent = msg;
      ul.appendChild(li);
    });
  } else {
    ul.classList.add("off");
    form.submit();
  }
});
