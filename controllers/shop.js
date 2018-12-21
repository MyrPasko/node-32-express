// const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    // console.log("Get Products");
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All products',
            path: '/products'
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;  // here we take rout parameter, product id.
    Product.findById(prodId, (product) => {
        // console.log("Chosen product: ", product);
        res.render('shop/product-detail', {
            product: product,
            pageTitle: "Product detail",
            path: `/products`    // this uses only for highlighting header menu in the case
        })
    })
};

exports.getIndex = (req, res, next) => {
    // console.log("Get Index");

    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};

exports.getCart = (req, res, next) => {
    // console.log("Get cart");
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart'
    })
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;  // this is from form hidden input
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price)
    });
    res.redirect('/cart');

};

exports.getCheckout = (req, res, next) => {
    // console.log("Get checkout");
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    })
};

exports.getOrders = (req, res, next) => {
    // console.log("Get orders");
    res.render('shop/orders', {
        pageTitle: 'Yours orders',
        path: '/orders'
    })
};


