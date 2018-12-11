// const products = [];
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'add-product',
        path: '/admin/add-product',
        activeAddProduct: true,
        formCSS: true,
        productCSS: true
    });
};

exports.postAddProduct = (req, res, next) => {
    // products.push({title: req.body.title});
    const product = new Product(req.body.title);
    product.save();

    res.redirect('/')
};

exports.getProducts = (req, res, next) => {

    const products = Product.fetchAll();

    res.render('shop', {
        prods: products,
        pageTitle: 'shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
};