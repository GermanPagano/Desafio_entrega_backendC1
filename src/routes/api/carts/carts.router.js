const express = require('express')
const fs = require('fs');
const path = require('path');
const router = express.Router()
const CART_FILE = path.resolve(__dirname, '../../../data/carts.json');

// funciones
// Verificar si el archivo existe, si no, crearlo con un array vacío
const verifyExist = () => {
    if (!fs.existsSync(CART_FILE)) {
        fs.writeFileSync(CART_FILE, JSON.stringify([], null, 2));
    }
};

// leer los productos del json
const read = () => {
    verifyExist();
    const data = fs.readFileSync(CART_FILE, 'utf-8');
    return JSON.parse(data);
};

// escribir el json para añadir productos
const write = (carts) => {
    verifyExist();
    fs.writeFileSync(CART_FILE, JSON.stringify(carts, null, 2));
};


// GET
router.get('/:cid', (req, res) => {
    const carts = readCarts();
    // const products = ()=>{
    //     const PRODUCTS_FILE = path.resolve(__dirname, '../../../data/products.json');
    //     const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    //     return JSON.parse(data);
    // };
    const cartId = parseInt(req.params.cid);
    const cart = carts.find(c => c.id === cartId);

    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    const cartProducts = cart.products.map(productItem => {
        const product = products.find(p => p.id === productItem.id);
        return {
            ...product,
            quantity: productItem.quantity
        };
    }).filter(Boolean);

    res.json(cartProducts);
});


// POST
router.post('/', (req,res) => {
    const carts = read();
    const newCart = {
        id: carts.length + 1,
        products: []
    };
    carts.push(newCart);
    write(carts);
    res.status(201).json({ msg: 'Cart created', cart: newCart });
})




module.exports = router
