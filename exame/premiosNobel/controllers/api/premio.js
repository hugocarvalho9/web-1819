var Premio = require('../../models/premio');

// Listar Prémios com condição no URL
module.exports.listaPremiosCondicional = (categoria, data) => {
    if (categoria && data) {
        return Premio.find({
                            category: categoria, 
                            year: {$gt: data}
                        })
                      .exec();
    }
    else if (categoria && !data) {
        return Premio.find({category: categoria})
                         .exec();
    }
    else {
        /* year e category */
        return Premio.find({},{_id: 0, year: 1, category: 1}) 
                     .exec();
    }
}

// Listar um prémio pelo seu ID 
module.exports.listarPremio = id => {
    return Premio.findOne({_id: id})
                 .exec();
};

module.exports.listaCategorias = () => {
    return Premio.distinct("category")
                 .exec();
}

module.exports.listaLaureados = () => {
    return Premio.aggregate(
                [{$unwind:"$laureates"}, 
                {$sort: {"laureates.firstname": -1, "laureates.surname": -1}}, 
                {$project: {"laureates.firstname":1, "laureates.surname":1, category:1, year:1, _id:0}}]
                )
                .exec();
}