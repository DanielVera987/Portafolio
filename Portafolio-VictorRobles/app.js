'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//cargar archivos rutas
const projectRouter = require('./router/project');

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS

//Rutas
app.use('/api', projectRouter);

//Exportamos
module.exports = app;
