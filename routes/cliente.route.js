const express = require('express');
const app = express();
const clientesRoutes = express.Router();

let Cliente = require('../model/Cliente');

// api to add cliente
clientesRoutes.route('/add').post(function (req, res) {
  let cliente = new Cliente(req.body);
  cliente.save()
  .then(cliente => {
    res.status(200).json({'status': 'success','mssg': 'cliente added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get clientes
clientesRoutes.route('/').get(function (req, res) {
  Cliente.find(function (err, clientes){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','clientes': clientes});
    }
  });
});

// api to get cliente
clientesRoutes.route('/cliente/:id').get(function (req, res) {
  let id = req.params.id;
  Cliente.findById(id, function (err, cliente){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','cliente': cliente});
    }
  });
});

// api to update route
clientesRoutes.route('/update/:id').put(function (req, res) {
    Cliente.findById(req.params.id, function(err, cliente) {
    if (!cliente){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        cliente.nome = req.body.nome;
        cliente.email = req.body.email;
        cliente.DataNascimento = req.body.DataNascimento;

        cliente.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
clientesRoutes.route('/delete/:id').delete(function (req, res) {
  Cliente.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = clientesRoutes;