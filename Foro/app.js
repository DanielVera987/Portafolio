'use strict'
//Requires 
const express = require('express')
const bodyParser = require('body-parser')

// Ejecutar Express
const app = express()

// Cargar nuestras rutas
const userRouter = require('./routers/user')
const topicRouter = require('./routers/topic')

// Midlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS

// Ejecutars Rutas
app.use('/api',userRouter)
app.use('/api',topicRouter)

// Exportar modulo
module.exports = app