const urlParams = new URLSearchParams(window.location.search);
const getId = urlParams.get('id');
const url = 'http://localhost:8090/api/produtos';
const urlID = 'http://localhost:8090/api/produtos/' + getId;

function atualizaCampos(produto) {
    var produtoAtualizado = {
        Codigo: getId,
        Nome: produto.Nome,
        Descricao: produto.Descricao,
        Avaliacao: produto.Avaliacao,
        Estoque: produto.Estoque,
        Preco: produto.preco,
        Categoria: produto.categoria,
        Imagem: produto.Imagem
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4)
            if (this.status == 204)
                alert("O carro foi atualizado com sucesso!");
            else
                alert("Erro ao atualizar o carro. Status: " + this.status);
    };
    xhttp.open("PATCH", url);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify(produtoAtualizado));
}

async function getProduto() {
    let card = document.querySelector('.cars')
    let data = await fetch(urlID);

    let response = await data.json();

    let codigo = response.Codigo;
    let nome = response.Nome;
    let descricao = response.Descricao;
    let avaliacao = response.Avaliacao;
    let estoque = response.Estoque;
    let preco = response.Preco;
    let categoria = response.Categoria;
    let imagem = response.Imagem;

    card.innerHTML += `
        <div class= "card">
        <h3 class="titulo"> ${nome} </h3>
        <img src="${imagem}" alt="Não foi possivel carregar a imagem corretamente" class="imagem">
        <p> class="avaliacao"> ${avaliacao} </p>
        <p> class="estoque"> ${estoque} </p>
        <p> class="descricao"> ${descricao} </p>
        <p> class="descricao"> ${categoria} </p>
        <p class="preco"> ${preco} </p>
        </div>
        <button class="botao">
        <a href="detalhes.html?id=${codigo}"> </a>
        </button>

        `
}

getProduto();