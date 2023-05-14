const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Cliente = new Schema({
  nome: {
    type: String
  },
  email: {
    type: String
  },
  DataNascimento: {
    type: String
  },
},{
    collection: 'cliente'
});

module.exports = mongoose.model('Cliente', Cliente);