// const products = [];
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    console.log("Get Products");
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All products',
            path: '/products'
        });
    });
};

exports.getIndex = (req, res, next) => {
    console.log("Get Index");

    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};

exports.getCart = (req, res, next) => {
    console.log("Get cart");
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart'
    })
};

exports.getCheckout = (req, res, next) => {
    console.log("Get checkout");
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    })
};

exports.getOrders = (req, res, next) => {
    console.log("Get orders");
    res.render('shop/orders', {
        pageTitle: 'Yours orders',
        path: '/orders'
    })
};


