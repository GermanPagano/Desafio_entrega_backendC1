const express = require("express");
const productsRouter = require("./routes/api/products/products.router.js");
const cartRouter = require("./routes/api/carts/carts.router.js")
const app = express();
const PORT = 8080;

// Middlewares
app.use(express.urlencoded({ extended: true })); // enviar parametros desde url
app.use(express.json()); // enviar info desde url

// Importamos las rutas 
app.use("/products", productsRouter);
app.use("/carts", cartRouter)
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`);
});
