const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log("Get add products");
    res.render('admin/add-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product',

    });
};

exports.getProducts = (req, res, next) => {
    console.log("Get products");
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products'
        })
    })
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, price, description);

    console.log("From post Add Product");
    product.save();

    res.redirect('/')
};