'use strict'
//Requires 
const express = require('express')
const bodyParser = require('body-parser')

// Ejecutar Express
const app = express()

// Cargar nuestras rutas
const userRouter = require('./routers/user')

// Midlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS

// Ejecutars Rutas
app.use('/api',userRouter)

// Exportar modulo
module.exports = app