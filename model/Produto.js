const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Produto = new Schema({
    nome: {
        type: String
    },
    marca: {
        type: String
    },
    DataFabricacao: {
        type: String
    }
}, {
    collection: 'produto'
});

module.exports = mongoose.model('Produto', Produto);