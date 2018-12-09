const path = require('path');
const express = require('express');

const rootDir = require('../util/path'); // The path to main folder of project;
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {

    const products = adminData.products;
    res.render('shop', {
        prods: products,
        pageTitle: 'shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
});

module.exports = router;