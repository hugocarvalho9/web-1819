var express = require('express');
var router = express.Router();
var Premio = require('../../controllers/api/premio');

router.get('/', (req, res) => {
    Premio.listaLaureados()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de categorias!'));
});

module.exports = router;