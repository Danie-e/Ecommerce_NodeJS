const url = 'http://localhost:8090/api/produtos'

async function getProdutos() {
    let card = document.querySelector('.cars')
    let data = await fetch(url);

    let response = await data.json();

    for (let i = 0; i < 12; i++) {
        let codigo = response[i].Codigo;
        let nome = response[i].Nome;
        let preco = response[i].Preco;
        let imagem = response[i].Imagem;

        card.innerHTML += `
        <div class= "card">
        <img src="${imagem}" alt="Não foi possivel carregar a imagem corretamente" class="imagem">
        <h3 class="titulo"> ${nome} </h3>
        <p class="preco"> ${preco} </p>
        </div>
        <button class="botao">
        <a href="detalhes.html?id=${codigo}"> </a>
        </button>

        `
    }
}

getProdutos();