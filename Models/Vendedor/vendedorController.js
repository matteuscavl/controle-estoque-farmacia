const express = require('express');
const router = express.Router();


router.get('/vendedor', (req, res) => {
    res.send('Rota de Vendedor');
})

module.exports = router;