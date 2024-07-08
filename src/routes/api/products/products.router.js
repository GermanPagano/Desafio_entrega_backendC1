const express = require('express')
const fs = require('fs');
const path = require('path');
const router = express.Router()
const PRODUCTS_FILE = path.resolve(__dirname, '../../../data/products.json');

// funciones
// Verificar si el archivo existe, si no, crearlo con un array vacío
const verifyExist = () => {
    if (!fs.existsSync(PRODUCTS_FILE)) {
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([], null, 2));
    }
};

// leer los productos del json
;const readProducts = () => {
    verifyExist();
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
}

// escribir el json para añadir productos
const writeProducts = (products) => {
    verifyExist();
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};


// endpoints 

// GET todos los productos
router.get('/', (req, res) => {
    const products = readProducts();
    res.json(products)
})

// GET mostrar por id
router.get('/:pid', (req, res) => {
    const products = readProducts();
    let selectProduct =  parseInt(req.params.pid)
    let search = products.find( e => e.id === selectProduct)
    res.json({search})
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
        return res.status(400).json({ error: 'Error faltan datos para añadir un producto' });
    }

    products.push(newProduct);
    writeProducts(products);
    res.status(201).json({ msg: 'Producto agregado correctamente', product: newProduct });
});

// put 
router.put( '/:pid' , (req , res) => {
    let products = readProducts();
    let selectProduct =  parseInt(req.params.pid)
    let search = products.find( e => e.id === selectProduct)
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
    writeProducts(products);

    res.json({ msg: 'Product updated', product: productUpdated });

})

router.delete('/:pid', (req,res) => {
    let products = readProducts();
    const selectProduct =  parseInt(req.params.pid)
    const searchProduct = products.find(p => p.id === selectProduct)
    const newProducts = products.filter( e => e.id !== selectProduct)
    if (!searchProduct) {
        return res.status(404).json({ error: 'Product not found' });
    }
    products = newProducts
    writeProducts(products);
    res.json({ msg: 'Product eliminado ', product: selectProduct });

})









module.exports = router
