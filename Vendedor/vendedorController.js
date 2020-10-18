const express = require('express');
const router = express.Router();

router.get('/vendedor', (req, res) => {
    res.send('Testando Rota Vendedor')
})

module.exports = router;