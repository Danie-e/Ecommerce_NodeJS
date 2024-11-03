const urlParams = new URLSearchParams(window.location.search);
const getId = urlParams.get('id');
const url = 'http://localhost:8090/api/produtos';
const urlID = 'http://localhost:8090/api/produtos/' + getId;

function atualizarProduto() {
    var produtoAtualizado = {
        Codigo: getId,
        Nome: document.getElementById("Nome").value,
        Descricao: document.getElementById("Descricao").value,
        Avaliacao: document.getElementById("Avaliacao").value,
        Estoque: document.getElementById("Estoque").value,
        Preco: document.getElementById("Preco").value,
        Categoria: document.getElementById("Categoria").value,
        Imagem: document.getElementById("Imagem").value
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4)
            if (this.status == 204) {
                alert("O produto foi atualizado com sucesso!");
                window.location = "/index.html";
            }
            else
                alert("Erro ao atualizar o produto. Status: " + this.status);
    };
    xhttp.open("PATCH", url);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify(produtoAtualizado));
}

async function carregarPagina() {
    let menu = document.querySelector('.menu')

    let data = await fetch(urlID);

    let response = await data.json();

    let nome = response[0].Nome;
    let descricao = response[0].Descricao;
    let avaliacao = response[0].Avaliacao;
    let estoque = response[0].Estoque;
    let preco = response[0].Preco;
    let categoria = response[0].Categoria;
    let imagem = response[0].Imagem;

    menu.innerHTML += `
    <form class="formulario">
    <label>Nome</label>
    <input type="text" required="true" name="Nome" id="Nome" value="${nome}">
      
    <label>Preco</label>
    <input type="number" required="true" name="Preco" id="Preco" value="${preco}">
   
    <label>Descricao</label>
    <input type="text" name="Descricao" id="Descricao" value="${descricao}">
   
    <label>Estoque</label>
    <input type="number" required="true" name="Estoque" id="Estoque" value="${estoque}">
   
    <label>Avaliacao</label>
    <input type="number" required="true" name="Avaliacao" id="Avaliacao" value="${avaliacao}">
   
    <label>Categoria</label>
    <input type="text" name="Categoria" id="Categoria" value="${categoria}">
   
    <label>Imagem</label>
    <input type="text" name="Imagem" id="Imagem" value="${imagem}">
   
    <button type="button" onClick="atualizarProduto()">Criar novo produto</button>
</form>
`

}

carregarPagina();