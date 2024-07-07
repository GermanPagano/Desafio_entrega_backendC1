const express = require('express')
const router = express.Router()

const carts = [{ mensje: "carrito"}]

// GET
router.get('/', (req, res) => {
    res.json(carts)
})

// POST
router.post('/', (req, res) => {
    const newCart = req.body
    carts.push(newCart)
    res.json({ msg: 'nuevo carrito' })
})

module.exports = router
