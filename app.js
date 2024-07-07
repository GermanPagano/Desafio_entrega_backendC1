const express = require('express')
const app = express()
const PORT = 8080
//Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.listen(PORT, () => {console.log(`Server Running on PORT: ${PORT}`)})
