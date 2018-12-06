const path = require('path');
const express = require('express');

const rootDir = require('../util/path'); // The path to main folder of project;
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    // res.send('<h1>Hello from Express!</h1>');
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    console.log('shop.js', adminData.products);
    /** This is for usual HTML */
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    /** And this is for PUG */
    /** And this is for Handlebars too */
    const products = adminData.products;
    /** 'HasProducts', 'activeShop', 'productCSS' keys is only for Handlebars */
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