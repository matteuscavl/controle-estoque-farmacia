const express = require('express');
const Vendedor = require('./Vendedor');
const Produto = require('../Produtos/Produto');
const Cliente = require('../Clientes/Cliente');
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

    Produto.findOne({
        where: {
            nomeProduto: nomeProduto,
        }
    }).then((produto) => {
        if (produto) {
            Produto.findAll().then(produtos => {
                res.render('Produto/produtoList', {produtos: produto})
            })
        } else {
            Produto.create({
                nomeProduto: nomeProduto,
                preco: precoProduto,
                quantidade: quantidade
            }).then(() => res.render('Vendedor/sessaoVendedor'))
            .catch((error) => console.log('Falha' + error));
        }
    })
})

router.get('/realizarVenda', (req, res) => {
    Produto.findAll().then((produtos) => {
        res.render('Vendedor/realizarVenda', {produtos: produtos});
    })
})

router.post('/venda', (req, res) => {
    const pedido = req.body.produtos;
    const quantidadePedido = req.body.quantidade;
    const nomeCliente = req.body.nomeCliente;
    const telefoneCliente = req.body.telefoneCliente;

    Cliente.findOne({
        where: {
            nomeCliente: nomeCliente,
            telefone: telefoneCliente 
        }
    }).then((cliente) => {
        if (cliente) {
            Produto.findByPk(pedido).then((produto) => {
                if (produto.quantidade >= quantidadePedido) {
                    Produto.update({quantidade: produto.quantidade - quantidadePedido}, {
                        where: {
                            id: pedido
                        }
                    }).then(() => res.redirect('Vendedor/realizarVenda'))
                } else {
                    res.send('Não há produtos no estoque');
                }
            })
        } else {
            Cliente.create({
                nomeCliente: nomeCliente,
                telefone: telefoneCliente
            }).then(Produto.findByPk(pedido).then((produto) => {
                if (produto.quantidade >= quantidadePedido) {
                    Produto.update({quantidade: produto.quantidade - quantidadePedido}, {
                        where: {
                            id: pedido
                        }
                    }).then(() => res.redirect('Vendedor/realizarVenda'))
                } else {
                    res.send('Não há produto disponivel no estoque');
                }
            }))
        }
    })
})

module.exports = router;