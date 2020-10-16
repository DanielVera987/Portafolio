'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.port || 3000;

const libraryRouter = require('./Routers/libros');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1/directorio', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/v1/api/', libraryRouter);

app.listen(port, () => {
  console.log('app ejecutandose en el puesto 3000');
});