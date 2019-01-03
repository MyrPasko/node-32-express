// const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {                      // destructuring of array of results
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'All products',
                path: '/products'
            });
        })
        .catch((err) => {
            console.log("Error from getIndex: ", err);
        });


};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;  // here we take rout parameter, product id.
    Product.findById(prodId)
        .then(([product]) => {
            res.render('shop/product-detail', {
                product: product[0],
                pageTitle: "Product detail",
                path: '/products'
            })
        })
        .catch((err) => {
            console.log("Error from getProduct: ", err);
        })
};

exports.getIndex = (req, res, next) => {

    Product.fetchAll()
        .then(([rows, fieldData]) => {                      // destructuring of array of results
            res.render('shop/index', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/'
            });

        })
        .catch((err) => {
            console.log("Error from getIndex: ", err);
        });
};

exports.getCart = (req, res, next) => {
    // console.log("Get cart");
    Cart.getCart((cart) => {
        Product.fetchAll((products) => {
            const cartProducts = [];
            for (let product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, quantity: cartProductData.quantity});
                }
            }

            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            })
        });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;  // this is from form hidden input
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price)
    });
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
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


// // const products = [];
// const Product = require('../models/product');
// const Cart = require('../models/cart');
//
// exports.getProducts = (req, res, next) => {
//     // console.log("Get Products");
//     Product.fetchAll((products) => {
//         res.render('shop/product-list', {
//             prods: products,
//             pageTitle: 'All products',
//             path: '/products'
//         });
//     });
// };
//
// exports.getProduct = (req, res, next) => {
//     const prodId = req.params.productId;  // here we take rout parameter, product id.
//     Product.findById(prodId, (product) => {
//         // console.log("Chosen product: ", product);
//         res.render('shop/product-detail', {
//             product: product,
//             pageTitle: "Product detail",
//             path: `/products`    // this uses only for highlighting header menu in the case
//         })
//     })
// };
//
// exports.getIndex = (req, res, next) => {
//     // console.log("Get Index");
//
//     Product.fetchAll((products) => {
//         res.render('shop/index', {
//             prods: products,
//             pageTitle: 'Shop',
//             path: '/'
//         });
//     });
// };
//
// exports.getCart = (req, res, next) => {
//     // console.log("Get cart");
//     Cart.getCart((cart) => {
//         Product.fetchAll((products) => {
//             const cartProducts = [];
//             for (let product of products) {
//                 const cartProductData = cart.products.find(prod => prod.id === product.id);
//                 if (cartProductData) {
//                     cartProducts.push({productData: product, quantity: cartProductData.quantity});
//                 }
//             }
//
//             res.render('shop/cart', {
//                 path: '/cart',
//                 pageTitle: 'Your Cart',
//                 products: cartProducts
//             })
//         });
//     });
// };
//
// exports.postCart = (req, res, next) => {
//     const prodId = req.body.productId;  // this is from form hidden input
//     Product.findById(prodId, (product) => {
//         Cart.addProduct(prodId, product.price)
//     });
//     res.redirect('/cart');
// };
//
// exports.postCartDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     Product.findById(prodId, (product) => {
//         Cart.deleteProduct(prodId, product.price);
//         res.redirect('/cart');
//     })
// };
//
// exports.getCheckout = (req, res, next) => {
//     // console.log("Get checkout");
//     res.render('shop/checkout', {
//         pageTitle: 'Checkout',
//         path: '/checkout'
//     })
// };
//
// exports.getOrders = (req, res, next) => {
//     // console.log("Get orders");
//     res.render('shop/orders', {
//         pageTitle: 'Yours orders',
//         path: '/orders'
//     })
// };


