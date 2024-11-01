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
}

module.exports = {
    getProdutos: getProdutos
}