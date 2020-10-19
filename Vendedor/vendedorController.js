const express = require('express');
const router = express.Router();
const Vendedor = require('./vendedor')

router.get('/vendedor', (req, res) => {
    res.render('Vendedor/vendedorAuth')
})

router.post('/vendedor/auth', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const password = req.body.password;

    Vendedor.findOne({
        where: {
            nome: nome,
            email: email,
            password: password,
        }
    }).then(usuarios => {
        if(usuarios) {
            res.send('Usuario Encontrado')
        } else {
            res.send('Usuario Não Encontrado')
        }
    })
})

router.get('/vendedor/create', (req, res) => {
    res.render('Vendedor/vendedorCreate');
})

router.post('/vendedor/create/auth', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const password = req.body.password;

    Vendedor.create({
        nome: nome,
        email: email,
        password: password
    }).then(() => console.log('Usuario Cadastrado'))
    .catch((error) => console.log(error))
})

module.exports = router;