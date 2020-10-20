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
    to: 'dbenjamin@opasesores.com',
    subject: 'Plantilla HTML',
    html: { path: './index.html' },
    attachments: [
      {
        filename: 'LogoVisitMexicoCom3.png',
        path: `./LogoVisitMexicoCom3.png`,
        cid: 'nyan@example.com' // should be as unique as possible
      },
      {
        filename: 'opa.png',
        path: `./opa.png`,
        cid: 'opa@example.com' // should be as unique as possible
      },
      {
        filename: 'fondo2.png',
        path: `./fondo2.png`,
        cid: 'fondo@example.com' // should be as unique as possible
      },
      {
        filename: 'btn.png',
        path: `./btn.png`,
        cid: 'btn@example.com' // should be as unique as possible
      },
    ]
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