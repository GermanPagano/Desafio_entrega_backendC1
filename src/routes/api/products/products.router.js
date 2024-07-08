const express = require('express')
const fs = require('fs');
const path = require('path');
const router = express.Router()
const PRODUCTS_FILE = path.resolve(__dirname, '../../../data/products.json');
const { verifyFileExist , read , write  } = require('../../../util/fileSystemFunctions.js'); // Ruta correcta al archivo de funciones


// funciones


// escribir el json para añadir productos
const writeProducts = (products) => {
    verifyFileExist(PRODUCTS_FILE);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};


// endpoints 

// GET todos los productos
router.get('/', (req, res) => {
    const products = read(PRODUCTS_FILE);
    res.json(products)
})

// GET mostrar por id
router.get('/:pid', (req, res) => {
    const products = read(PRODUCTS_FILE);
    let selectProduct =  parseInt(req.params.pid)
    let search = products.find( e => e.id === selectProduct)
    res.json({search})
})


// POST
router.post('/', (req, res) => {
    const products = read(PRODUCTS_FILE);
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
        return res.status(400).json({ error: 'Error faltan datos para añadir un producto' });
    }

    products.push(newProduct);
    write(PRODUCTS_FILE, products);
    res.status(201).json({ msg: 'Producto agregado correctamente', product: newProduct });
});

// put 
router.put('/:pid', (req, res) => {
    let products = read(PRODUCTS_FILE);
    const selectProduct = parseInt(req.params.pid);
    const search = products.find(e => e.id === selectProduct);

    if (!search) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const productUpdated = {
        id: search.id,
        title: req.body.title || search.title,
        description: req.body.description || search.description,
        code: req.body.code || search.code,
        price: req.body.price || search.price,
        status: req.body.status || search.status,
        stock: req.body.stock || search.stock,
        category: req.body.category || search.category,
        thumbnails: req.body.thumbnails || search.thumbnails
    };

    // Reemplazar el producto en el array
    products = products.map(p => p.id === selectProduct ? productUpdated : p);
    write(PRODUCTS_FILE, products);

    res.json({ msg: 'Product updated', product: productUpdated });
});


// delete
router.delete('/:pid', (req, res) => {
    let products = read(PRODUCTS_FILE);
    const selectProduct = parseInt(req.params.pid);
    const searchProduct = products.find(p => p.id === selectProduct);

    if (!searchProduct) {
        return res.status(404).json({ error: 'Product not found' });
    }

    products = products.filter(e => e.id !== selectProduct);
    write(PRODUCTS_FILE, products);
    res.json({ msg: 'Product eliminado', product: selectProduct });
});




module.exports = router
