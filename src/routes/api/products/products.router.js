const express = require('express')
const router = express.Router()

const productos = [{mensaje: 'producto'}]

// GET
router.get('/', (req, res) => {
    res.json(productos)
})

// POST
router.post('/', (req, res) => {
    const newProduct = req.body
    productos.push(newProduct)
    res.json({ msg: 'agregado' })
})

module.exports = router
