var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PremioSchema = new Schema({
    year: {type: String},
    category: {type: String},
    overallMotivation: {type: String},
    laureates: [
        {
            id: {type: String, required: true},
            firstname: {type: String},
            lastname: {type: String},
            motivation: {type: String},
            share: {type: String}
        }
    ]
});

module.exports = mongoose.model('Premio', PremioSchema, 'premios');