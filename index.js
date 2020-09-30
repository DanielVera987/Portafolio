'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.port || 3000

mongoose.connect('mongodb://localhost:27017/portafolio', {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(port, () => {
  console.log('Servidor escuchando en el puerto 3000')
})