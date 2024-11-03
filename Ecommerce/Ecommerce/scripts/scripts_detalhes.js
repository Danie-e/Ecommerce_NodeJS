const urlParams = new URLSearchParams(window.location.search);
const getId = urlParams.get('id');
const url = 'http://localhost:8090/api/produtos';
const urlID = 'http://localhost:8090/api/produtos/' + getId;

function atualizaCampos() {
    window.location = `atualizar.html?id=${getId}`


}

async function excluirProduto(id) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4)

            if (this.status == 200) {
                alert("O produto foi excluido com sucesso!");
                window.location = "/index.html";
            }
            else
                alert("Erro ao deletar o produto. Status: " + this.status);
    };
    xhttp.open('DELETE', urlID);
    xhttp.send();

}

async function getProduto() {
    let corpo = document.querySelector('.corpo')
    let data = await fetch(urlID);

    let response = await data.json();

    let codigo = response[0].Codigo;
    let nome = response[0].Nome;
    let descricao = response[0].Descricao;
    let avaliacao = response[0].Avaliacao;
    let estoque = response[0].Estoque;
    let preco = response[0].Preco;
    let categoria = response[0].Categoria;
    let imagem = response[0].Imagem;

    corpo.innerHTML += `
        <h3 class="titulo"> ${nome} </h3>
        <img src="${imagem}" alt="Não foi possivel carregar a imagem corretamente" class="imagem h-50">
        
        <div class="informacoes">
        <p class="categoria">Categoria: ${categoria} </p>
        <p class="avaliacao"> ${avaliacao} <span class="material-symbols-outlined">star</span></p>
        <p class="estoque">Em estoque: ${estoque} </p>
        <p class="preco">R$ ${preco} </p>
        </div>
        
        <p class="descricao"> ${descricao} </p>

        <div class="botoes">
            <button class="botaoModificar" onclick="atualizaCampos()"> Modificar informações </button>
            <button class="botaoExcluir" onclick="excluirProduto(${codigo})"> Exclui produto </button>
        </div>
        
        `
}

getProduto();