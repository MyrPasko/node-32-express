// const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll({})
        .then((products) => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All products',
                path: '/products'
            });
        })
        .catch((err) => {
            console.log("Error from getProducts: ", err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;  // here we take rout parameter, product id.

    Product.findById(prodId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            })
        })
        .catch((err) => {
            console.log("Error from getProduct: ", err);
        });

    /** Alternative method for Sequelize */
    // Product.findAll({
    //     where: {
    //         id: prodId
    //     }
    // })
    //     .then((products) => {
    //         res.render('shop/product-detail', {
    //             product: products[0],
    //             pageTitle: products[0].title,
    //             path: '/products'
    //         })
    //     })
    //     .catch((err) => {
    //         console.log("Error from getProduct: ", err);
    //     });
};

exports.getIndex = (req, res, next) => {
    Product.findAll({})
        .then((products) => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch((err) => {
            console.log("Error from getIndex: ", err);
        });
};

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then((cart) => {
            console.log("Cart from getCart: ", cart);
            return cart.getProducts()
                .then((cartProducts) => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your Cart',
                        products: cartProducts
                    })
                })
                .catch((err) => {
                    console.log("Error from getCart/getProducts: ", err);

                });
        })
        .catch((err) => {
            console.log("Error from getCart: ", err);
        });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;  // this is from form hidden input
    let fetchedCart;
    let newQuantity = 1;

    req.user.getCart()
        .then((cart) => {
            console.log("Cart from postCard: ", cart);
            fetchedCart = cart;
            return cart.getProducts({where: {id: prodId}});
        })
        .then((products) => {
            let product;
            if (products.length > 0) {
                product = products[0]
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findById(prodId)
        })
        .then((product) => {
            console.log("Product from getCart/findById: ", product);
            return fetchedCart.addProduct(product, {
                through: {
                    quantity: newQuantity
                }
            })
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch((err) => {
            console.log("Error from postCard: ", err);
        });
    // Product.findById(prodId, (product) => {
    //     Cart.addProduct(prodId, product.price)
    // });
    // res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
        .then((cart) => {
            return cart.getProducts({where: {id: prodId}})
        })
        .then((products) => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then((result) => {
            res.redirect('/cart');
        })
        .catch((err) => {
            console.log("Error from postCartDeleteProduct: ", err);
        });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    })
};

exports.getOrders = (req, res, next) => {
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


