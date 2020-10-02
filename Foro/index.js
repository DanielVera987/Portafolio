'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.port || 3000

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/forum', { useNewUrlParser: true , seUnifiedTopology: true })
        .then(() => {
          console.log('Conexion exitosa a la base de datos')
          
          //Creando servidor
          app.listen(port, () => {
            console.log('App escuchando en el puerto 30000')
          })
        })
        .catch(err => console.log(err))
