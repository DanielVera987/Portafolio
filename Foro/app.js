'use strict'
//Requires 
const express = require('express')
const bodyParser = require('body-parser')

// Ejecutar Express
const app = express()

// Cargar nuestras rutas

// Midlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS

// Ejecutras Rutas

// Exportar modulo
module.exports = app