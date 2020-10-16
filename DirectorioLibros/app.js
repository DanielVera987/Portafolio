'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.port || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', (req, res) => {
  res.status(200).send("Hola mundo");
});

app.listen(port, () => {
  console.log('app ejecutandose en el puesto 3000');
});