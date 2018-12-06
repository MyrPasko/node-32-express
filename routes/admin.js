const path = require('path');
const express = require('express');

const rootDir = require('../util/path'); // The path to main folder of project;

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    console.warn('admin.js', "Hello from Express!");
    // res.send('<h1>Hello from Add-Product Middleware!!!</h1>');
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit" >Submit</button></form>');
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    /** This is for usual HTML */
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    /** And this is for PUG */
    /** And this is for Handlebars too */
    /** 'activeAddProduct', 'formCSS', 'productCSS' are for Handlebars only */
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

// module.exports = router;

exports.routes = router;
exports.products = products;
