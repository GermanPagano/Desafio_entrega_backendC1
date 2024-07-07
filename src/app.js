const express = require('express')
const app = express()
const PORT = 8080
//Middlewares
app.use(express.urlencoded({extended:true})) // enviar parametros desde url
app.use(express.json()) //enviar info desde url




app.listen(PORT, () => {console.log(`Server Running on PORT: ${PORT}`)})
