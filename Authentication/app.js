'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Llamamos las rutas

const app = express()

app.use(cors)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Conexion a mongoose   

// Ejecutamos Rutas
app.get('/', (req, res) => {
  return res.status(200).send('hello world')
})

module.exports = app