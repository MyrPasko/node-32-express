// const products = [];
const fs = require('fs');
const path = require('path');
const fullPath = require('../util/path');
const p = path.join(fullPath, 'data', 'products.json');

const getProductsFromFile = (callback) => {
    console.log("Controller get products from file");
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return callback([]);
        }
        // return JSON.parse(fileContent);
        callback(JSON.parse(fileContent));
    });
};

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile((products) => {
            console.log("From Controller save");
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

};