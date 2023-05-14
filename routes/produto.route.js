const express = require('express');
const app = express();
const produtoRoutes = express.Router();

let Produto = require('../model/Produto');

// api to add produto
produtoRoutes.route('/add').post(function (req, res) {
    let produto = new Produto(req.body);
    produto.save()
        .then(produto => {
            res.status(200).json({ 'status': 'success', 'mssg': 'produto added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
        });
});

// api to get produtos
produtoRoutes.route('/').get(function (req, res) {
    Produto.find(function (err, produtos) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'produtos': produtos });
        }
    });
});

// api to get produto
produtoRoutes.route('/produto/:id').get(function (req, res) {
    let id = req.params.id;
    Produto.findById(id, function (err, produto) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'produto': produto });
        }
    });
});

// api to update route
produtoRoutes.route('/update/:id').put(function (req, res) {
    Produto.findById(req.params.id, function (err, produto) {
        if (!produto) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            produto.nome = req.body.nome;
            produto.marca = req.body.marca;
            produto.DataFabricacao = req.body.DataFabricacao;

            produto.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
            })
        }
    });
});

// api for delete
produtoRoutes.route('/delete/:id').delete(function (req, res) {
    Produto.findByIdAndRemove({ _id: req.params.id }, function (err,) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = produtoRoutes;