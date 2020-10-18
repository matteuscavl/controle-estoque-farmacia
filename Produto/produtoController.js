const express = require('express');
const router = express.Router();

router.get('/produto', (req, res) => {
    res.send('Testando Rota de Produtos')
})

module.exports = router;