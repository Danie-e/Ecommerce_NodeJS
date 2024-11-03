const url = 'http://localhost:8090/api/produtos'

async function getProdutos() {
    let card = document.querySelector('.cards')
    let data = await fetch(url);

    let response = await data.json();

    for (let i = 0; i < 12; i++) {
        let codigo = response[i].Codigo;
        let nome = response[i].Nome;
        let preco = response[i].Preco;
        let imagem = response[i].Imagem;

        card.innerHTML += `
        <div class="col">
            <div class="card  h-100" style="width: 100%;">
                <img src="${imagem}" class="card-img-top" alt="Não foi possivel carregar a imagem.">
                <div class="card-body">
                    <h5 class="card-title">${nome}</h5>
                    <p class="card-text">R$ ${preco}</p>
                    <a href="html/detalhes.html?id=${codigo}" class="btn btn-primary">Ver detalhes</a>
                </div>
            </div>
      </div>
        `
    }
}

async function carregarModal() {
    let carousel = document.querySelector('.carousel-inner')
    
    let data = await fetch(url);

    let response = await data.json();

    for (let i = 0; i < 3; i++) {
        let nome = response[i].Nome;
        let descricao = response[i].Descricao;
        let imagem = response[i].Imagem;

        carousel.innerHTML += `
        <div class="carousel-item active">
            <img src="${imagem}"  class="bd-placeholder-img bd-placeholder-img-lg d-block w-100" width="800" height="400" alt="Não foi possivel carregar a imagem.">
            <div class="carousel-caption d-none d-md-block">
              <h5>${nome}</h5>
              <p>${descricao}</p>
            </div>
        </div>
        `
    }
}

carregarModal();
getProdutos();