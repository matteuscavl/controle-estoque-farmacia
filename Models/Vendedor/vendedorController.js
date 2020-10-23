const express = require('express');
const Vendedor = require('./Vendedor');
const Produto = require('../Produtos/Produto');
const vendedorAuth = require('../../middlewares/vendedorauth');
const router = express.Router();


router.get('/cadastroVendedor', (req, res) => {
    res.render('Vendedor/cadastroVendedor');
})

router.get('/loginVendedor', (req, res) => {
    res.render('Vendedor/loginVendedor');
})

router.post('/concluirCadastro', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const password = req.body.password;

    Vendedor.findOne({
        where: {
            email: email, 
            password: password,
        }
    }).then((vendedores) => {
        if (vendedores) {
            res.send('Usuario Existente')
        } else {
            Vendedor.create({
                nome: nome,
                email: email, 
                password: password
            }).then(() => console.log('Usuario Cadastrado')).catch((err) => console.log('N criado' + err))
        }
    })
})

router.post('/autenticarVendedor', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const password = req.body.password;

    Vendedor.findOne({
        where: {
            nome: nome,
            email: email, 
            password: password
        }
    }).then((usuario) => {
        if (usuario) {
            res.render('Vendedor/sessaoVendedor')
        } else {
            res.redirect('/');
        }
    })
})

router.get('/cadastrarProduto', (req, res) => {
    res.render('Produto/cadastrarProduto');
})

router.post('/newProduto', (req, res) => {
    const nomeProduto = req.body.nomeProduto;
    const precoProduto = parseFloat(req.body.precoProduto).toFixed(2);
    const quantidade = req.body.quantidade;

    Produto.create({
        nomeProduto: nomeProduto,
        preco: precoProduto,
        quantidade: quantidade
    }).then(() => console.log('Tabela Criada')).catch((error) => console.log('Falha' + error));
})

module.exports = router;