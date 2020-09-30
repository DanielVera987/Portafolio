'use strict';

const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors')

const app = express();
app 
  .get('/', (req, res) => {
    console.log('Listo')
    res.status(200).send({
      message: "Hola mundo"
    })
  })

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(cors)

module.exports = app
