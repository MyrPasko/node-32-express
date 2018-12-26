// const products = [];
const fs = require('fs');
const path = require('path');
const fullPath = require('../util/path');
const p = path.join(fullPath, 'data', 'products.json');
const Cart = require('./cart');

const getProductsFromFile = (callback) => {
    // console.log("Controller get products from file");
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return callback([]);
        }
        // return JSON.parse(fileContent);
        callback(JSON.parse(fileContent));
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile((products) => {
            // console.log("From Controller save");
            if (this.id) {
                const existingProductIndex = products.findIndex((prod) => {
                    return prod.id === this.id;
                });
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this; // we change existing product with the same id to our newly created product
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                })
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                })
            }
        })
    }

    static deleteById(id) {
        getProductsFromFile((products) => {
            const product = products.find((prod) => {
                return prod.id === id;
            });
            const updatedProducts = products.filter((prod) => {
                return prod.id !== id;
            });
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            })
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static findById(id, callback) {
        getProductsFromFile((products) => {
            const product = products.find((p) => {
                return p.id === id;
            });
            callback(product);
        })
    }

};