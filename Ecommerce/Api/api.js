var db = require('./dboperations');
var Produto = require('./Produto');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
});

router.route('/produtos').get((request, Response) => {
    dboperations.getProdutos().then(result => {
        Response.json(result[0]);
    });
});

router.route('/produtos/:id').get((request, response) => {
    dboperations.getProduto(request.params.id).then(result => {
        response.json(result[0]);
    });
});

router.route('produtos').post((request, response) => {
    let produto = { ...request.body }

    dboperations.insertProduto().then(result => {
        response.status(201).json(result);
    });
});

router.route('produtos').patch((request, response) => {
    let produto = { ...request.body }

    dboperations.updateProduto().then(result => {
        response.status(204).json(result);
    });
});

router.route('/produtos/:id').delete((request, response) => {
    dboperations.deleteProduto(request.params.id).then(result => {
        response.json(result[0]);
    });
});


var port = process.env.port || 8090;
app.listen(port);
console.log('Api de produtos rodando na porta: ' + port);

