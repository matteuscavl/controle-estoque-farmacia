const express = require('express');
const Vendedor = require('./Vendedor');
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

module.exports = router;