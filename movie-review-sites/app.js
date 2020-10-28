'use strict';

const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const routers = require('./routers/router');
const publicDir = express.static(`${__dirname}/public`);
const viewDir = `${__dirname}/views/`;
const bodyParser = require('body-parser');
const port = (process.env.PORT || 3000);
const app = express();

app
  .set('views', viewDir)
  .set('view engine', 'ejs')
  .set('port', port)

  .use(morgan('dev'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(publicDir)
  .use('/', routers)
 
module.exports = app;