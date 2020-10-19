// Inicio Configurações Iniciais do Servidor
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const connection = require('./database/database');

// Configurando Body Parser para tratar requisições de Formulário
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configurando o Template Engine e Arquivos Estáticos
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Importando as tabelas do Banco de Dados
const Vendedor = require('./Vendedor/vendedor');
const Estoquista = require('./Estoquista/estoquista');
const Produto = require('./Produto/produto');

// Instanciando as Rotas
const vendedorController = require('./Vendedor/vendedorController');
const estoquistaController = require('./Estoquista/estoquistaController');
const produtoController = require('./Produto/produtoController');

// Configurando a autenticação com o Banco de Dados
connection.authenticate()
    .then(() => console.log('Conexão com Banco de Dados estabelecida'))
    .catch((error) => 'Error' + error);

// Rotas
app.use('/', vendedorController);
app.use('/', estoquistaController);
app.use('/', produtoController);

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(port, error => {
    console.log('Servidor rodando na porta', port);
})