var express = require('express');
var url = require('url');
var router = express.Router();
var Premio = require('../../controllers/api/premio');

router.get('/', (req, res) => {
    var purl = url.parse(req.url, true);
    var query = purl.query;
    Premio.listaPremiosCondicional(query.categoria, query.data)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de premios!'));
});

router.get('/:id', (req, res) => {
    Premio.listarPremio(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem de premios!'));
});


module.exports = router;