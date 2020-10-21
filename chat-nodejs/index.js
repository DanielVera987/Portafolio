'use strict';

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => {
  console.log('conexion establecida...')
});

io.on('connection', (socket) => {
  console.log('New Connection');

  socket.on('new message', (msj) => {
    console.log(msj);
    
    socket.emit('new message', msj);
  });
});