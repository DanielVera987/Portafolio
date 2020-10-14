'use strict';

const express = require('express');
const nodemailer = require('nodemailer');
const port = process.env.port || 3000;

const app = express();

const sendEmail = (req, res) => {
  // Definimos el tranporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { 
      user: 'danielveraangulo703@gmail.com', 
      pass: 'password'
    }
  });
  // Definimos el email
  const mailOption = {
    from: 'Remitente',
    to: 'programador@opasesores.com',
    subject: 'prueba de envio de correo en nodejs',
    text: 'Contenido de email'
  };
  // Enviamos el email
  transporter.sendMail(mailOption, (err, send) => {
    if (err) return console.log(err);

    console.log('Email send');
  })
};

app.get('/send', sendEmail);

app.listen(port, () => {
  console.log('app escuchando en el puerto 3000 🚀🚀')
})