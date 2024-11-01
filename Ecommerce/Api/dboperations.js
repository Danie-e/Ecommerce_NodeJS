var config = require('./dbconfig');
const sql = require('mssql');

async function getProdutos() {
    try {
        let pool = await sql.connect(config);
        let lojas = await pool.request().query('SELECT * From Produto')
        return lojas.recordsets;
    }
    catch (error) {
        console.log(error);
    }
};

async function getProduto(carroId) {
    try {
        let pool = await sql.connect(config);
        let lojas = await pool.request()
            .input('input_parameter', sql.Int, carroId)
            .query('SELECT * FROM Produto WHERE Codigo = @input_parameter')
        return lojas.recordsets;
    }
    catch (error) {
        console.log(error);
    }
};

async function insertProduto(produto) {
    try {
        let pool = await sql.connect(config);
        let lojas = await pool.request()
            .query(`INSERT INTO Produto
            SET
            (
                [Preco], [Descricao], [Estoque], [Avaliacao], [Categoria], [Imagem]
            )
            VALUES
            (
                '${produto.Preco}',
                '${produto.Descricao}',
                '${produto.Estoque}',
                '${produto.Avaliacao}',
                '${produto.Categoria}',
                '${produto.Imagem}',
            )`);
        return lojas.recordsets;
    }
    catch (error) {
        console.log(error);
    }
};


async function updateProduto(produto) {
    try {
        let pool = await sql.connect(config);
        let loja = await pool.request()
            .input('input_parameter', sql.Int, produto.id)
            .query(`
            UPDATE [dbo].[Produto]
            SET
            [Preco] = '${produto.Preco}'
            [Descricao] = '${produto.Descricao}'
            [Estoque] = '${produto.Estoque}'
            [Avaliacao] = '${produto.Avaliacao}'
            [Categoria] = '${produto.Categoria}'
            [Imagem] = '${produto.Imagem}'
            WHERE Codigo - @input_parameter
            `);
        return loja.recordsets;
    }
    catch (error) {
        console.log(error);
    }
};

async function deleteProduto(produtoId) {
    try {
        let pool = await sql.connect(config);
        let lojas = await pool.request()
            .input('input_parameter', sql.Int, produtoId)
            .query('DELETE FROM Produto WHERE Codigo = @input_parameter');
        return lojas.recordsets;
    }
    catch (error) {
        console.log(error);
    }
};


module.exports = {
    getProdutos: getProdutos,
    getProduto: getProduto,
    insertProduto: insertProduto,
    updateProduto: updateProduto,
    deleteProduto: deleteProduto
}