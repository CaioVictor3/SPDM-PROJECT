const form = document.getElementsByTagName("form")[0];
const inputName = document.getElementById("nome");
const inputDescription = document.getElementById("descricao");
const inputPrice = document.getElementById("preco");
const inputQtd = document.getElementById("quantidade");
const errorsUl = document.getElementById("errors");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorsUl.innerHTML = "";

  let hasErrors = false;

  if (!inputName.value.trim()) {
    errorsUl.innerHTML += "<li>O nome é obrigatório.</li>";
    hasErrors = true;
  }

  if (!inputQtd.value.trim()) {
    errorsUl.innerHTML += "<li>A quantidade é obrigatória.</li>";
    hasErrors = true;
  }

  if (!inputPrice.value.trim()) {
    errorsUl.innerHTML += "<li>O preço é obrigatório.</li>";
    hasErrors = true;
  }

  if (!hasErrors) {
    const novoProduto = {
      nome: inputName.value.trim(),
      descricao: inputDescription.value.trim(),
      preco: parseFloat(inputPrice.value),
      quantidade: parseInt(inputQtd.value),
    };

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.push(novoProduto);
    localStorage.setItem("produtos", JSON.stringify(produtos));

    window.location.href = "../TelaInicial/Produtos.html";
  }
});

inputPrice.addEventListener("input", (event) => {
  validateNumberInput(event, true);
});

inputQtd.addEventListener("input", (event) => {
  validateNumberInput(event);
});

function validateNumberInput(event, float = false) {
  const value = event.target.value;

  if (!value) {
    event.target.value = null;
    return;
  }

  const num = float ? parseFloat(value) : parseInt(value);
  if (num < 0) {
    event.target.value = float ? 0.01 : 0;
  }
}
