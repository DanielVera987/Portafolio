'use strict'
const UserModel = require('../Models/User')
const crypto = require('crypto')

const controllerAuth = {

  register: (req, res) => {
    const {name, email, password} = req.body

    crypto.randomBytes(16, (err, salt) => {
      const newSalt = salt.toString('base64')

      crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
        const encryptedPassword = key.toString('base64')
        
        UserModel.findOne({email}).exec()
        .then(user => {
          if(user) return res.status(201).send({ status: 'success 🚀', message: 'Este usuario ya existe'})
          
          UserModel.create({
            name,
            email,
            password: encryptedPassword,
            salt: newSalt
          })
          .then(user => res.status(200).send( { status: 'success 🚀', user } ))
          .catch(err => res.status(500).send( { status: 'Error' } ))
        })

      })
    })
  },

  auth: (req, res) => {
    return res.status(200).send({
      message: 'Auth'
    })
  },

  me: (req, res) => {
    return res.status(200).send({
      message: 'Me'
    })
  }

}

module.exports = controllerAuth