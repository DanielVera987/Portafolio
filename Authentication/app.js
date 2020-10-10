'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routerAuth = require('./routers/auth')

const app = express()
//app.use(cors)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Conexion a mongoose   

app.use('/api', routerAuth)
app.get('/', (req, res) => {
  return res.status(200).send('Hola')
})

module.exports = app