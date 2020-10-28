'use strict';
const UserModel = require('../models/User');
const validator = require('validator');
const crypto = require('crypto');

const userController = {

  viewRegister: (req, res) =>  {
    const locals = {
      action: `/register`,
      title: 'Register',
      message: ''
    }
    res.render('register', locals);
  },

  register: (req, res) => {

    const name = !validator.isEmpty(req.body.name);
    const email = validator.isEmail(req.body.email);
    const password = !validator.isEmpty(req.body.password);

    if (!name || !email || !password) return res.render('error');

    const newUser = {
      name: req.body.name,
      email: req.body.email, 
      password: req.body.password
    }
  
    crypto.randomBytes(16, (err, salt) => {
      const newSalt = salt.toString('base64');

      crypto.pbkdf2(newUser.password, newSalt, 1000, 64, 'sha1', (err, key) => {
        const encryptedPassword = key.toString('base64');

        UserModel.findOne({email: newUser.email}, (err, user) => {
          if(err) return res.render('error');
          if(user) return res.render('register', {
            action: `/register`,
            title: 'Register',
            message: 'El usuario ya existe'
          });

          UserModel.create({
            name: newUser.name, 
            email: newUser.email,
            password: encryptedPassword,
            salt: newSalt
          }, (err, user) => {
            if(err) return res.render('error');
            console.log('success');
          });
        });
      });
    });

  },

  login: (req, res) => {
    res.send('Hello world');
  },

  me: (req, res) => {

  },
}

module.exports = userController;