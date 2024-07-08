const express = require('express')
const fs = require('fs');
const path = require('path');
const router = express.Router()
const CART_FILE = path.resolve(__dirname, '../../../data/carts.json');
const {  read , write  } = require('../../../util/fileSystemFunctions.js');

// funciones


// GET
router.get('/:cid', (req, res) => {
    const carts = read(CART_FILE);
    const cartId = parseInt(req.params.cid);
    const cart = carts.find(c => c.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    const PRODUCTS_FILE = path.resolve(__dirname, '../../../data/products.json');
    const products = read(PRODUCTS_FILE);

    const cartProducts = cart.products.map(productItem => {
        return {
            id: productItem.id,
            quantity: productItem.quantity
        };
    });

    res.json(cartProducts);
});


// POST
router.post('/', (req, res) => {
    const carts = read(CART_FILE);
    const newCart = {
        id: carts.length + 1,
        products: []
    };
    carts.push(newCart);
    write(CART_FILE, carts);
    res.status(201).json({ msg: 'Cart created', cart: newCart });
});

// POST AGREGAR PRODUCTOS
router.post('/:cid/product/:pid', (req, res) => {
    const carts = read(CART_FILE);
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity || 1; // Si no se especifica la cantidad, por defecto será 1

    const cart = carts.find(c => c.id === cartId);
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.products.find(p => p.id === productId);
    if (existingProduct) {
        // Incrementar la cantidad del producto existente
        existingProduct.quantity += quantity;
    } else {
        // Agregar el producto al carrito con la cantidad especificada
        cart.products.push({ id: productId, quantity });
    }

    // Guardar los cambios en el archivo
    write(CART_FILE, carts);

    res.status(201).json({ msg: 'Product added to cart', cart });
});







module.exports = router
