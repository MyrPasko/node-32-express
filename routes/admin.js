const express = require('express');

const rootDir = require('../util/path'); // The path to main folder of project;

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'add-product',
        path: '/admin/add-product',
        activeAddProduct: true,
        formCSS: true,
        productCSS: true
    });
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title});
    res.redirect('/')
});

exports.routes = router;
exports.products = products;
