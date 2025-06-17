document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("produtos");
  lista.innerHTML = "";

  let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  if (produtos.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Nenhum produto cadastrado.";
    lista.appendChild(li);
  } else {
    produtos.forEach((produto, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${produto.nome}</strong><br />
        ${produto.descricao}<br />
        Qtd: ${produto.quantidade}<br />
        R$ ${parseFloat(produto.preco).toFixed(2)}<br />
        <button class="btn-excluir" data-index="${index}">
          <i class="fas fa-trash"></i> Excluir
        </button>
      `;
      lista.appendChild(li);
    });
  }

  // Evento para excluir produto
  lista.addEventListener("click", (event) => {
    if (event.target.closest(".btn-excluir")) {
      const index = event.target.closest(".btn-excluir").dataset.index;
      produtos.splice(index, 1);
      localStorage.setItem("produtos", JSON.stringify(produtos));
      location.reload(); // Recarrega a tela para atualizar a lista
    }
  });
});
