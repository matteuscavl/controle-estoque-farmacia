const express = require('express');
const Produto = require('../Produto/produto');
const router = express.Router();

router.get('/estoquista', (req, res) => {
    res.render('Estoquista/estoquista');
})

router.get('/estoquista/cadastrarProduto', (req, res) => {
    res.render('Estoquista/CadastrarProduto');
})

router.post('/estoquista/novoProduto', (req, res) => {
    const nomeProduto = req.body.produto;
    const precoProduto = req.body.precoProduto;
    const quantidadeProduto = req.body.quantidadeProduto;

    Produto.create({
        nomeProduto: nomeProduto,
        preco: parseFloat(precoProduto),
        quantidade: quantidadeProduto,
    }).then(() => console.log('Produto Cadastrado')).catch((error) => console.log('Falha' + error))
})

module.exports = router;