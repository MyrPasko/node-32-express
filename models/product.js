// const products = [];
const fs = require('fs');
const path = require('path');
const fullPath = require('../util/path');

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        // products.push(this);

        const p = path.join(fullPath, 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })

        })
    }

    static fetchAll() {
        const p = path.join(fullPath, 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return [];
            }
            return JSON.parse(fileContent);
        });
        // return products;
    }

};