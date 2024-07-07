const express = require('express')
const fs = require('fs');
const path = require('path');
const router = express.Router()
const PRODUCTS_FILE = path.resolve(__dirname, '../../../data/products.json');


// leer los productos del json
const readProducts = () => {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
};

// escribir el json para añadir productos
const writeProducts = (products) => {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};




// GET
router.get('/', (req, res) => {
    const products = readProducts();
    res.json(products)
})

// POST
router.post('/', (req, res) => {
    const products = readProducts();
    const newProduct = {
        id: products.length + 1,
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: req.body.status ?? true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails || []
    };

    if (!newProduct.title || !newProduct.description || !newProduct.code ||
        !newProduct.price || !newProduct.stock || !newProduct.category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    products.push(newProduct);
    writeProducts(products);
    res.status(201).json({ msg: 'Product added', product: newProduct });
});

module.exports = router
