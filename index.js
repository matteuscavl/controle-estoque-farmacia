// ...
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database')
const app = express();
const port = 8080;

// ...
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ...
app.set('view engine', 'ejs');
app.use(express.static('public'));

//...
const Cliente = require('./Models/Clientes/Cliente');
const Vendedor = require('./Models/Vendedor/Vendedor');
const Produto = require('./Models/Produtos/Produto');

// ...
const vendedorController = require('./Models/Vendedor/vendedorController');

// ...
connection.authenticate()
    .then(() => console.log('Conexão com Banco de Dados Estabelecida'))
    .catch((err) => console.log('Falha' + err))

// Rotas
app.use('/', vendedorController);

// Rotas
app.get('/', (req, res) => {
    res.send('Tela Inicial do Novo update');
})

app.listen(port, error => {
    console.log('Servidor Rodando');
})