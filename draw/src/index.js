'use strict';
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

require('./socket.js')(io);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
  console.log('app escuchando en el puerto 3000');
});