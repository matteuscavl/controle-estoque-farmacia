const express = require('express');
const router = express.Router();

router.get('/estoquista', (req, res) => {
    res.send('Testando rota de Estoquista');
})

module.exports = router;