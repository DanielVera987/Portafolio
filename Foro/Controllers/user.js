'use strict'
const validator = require('validator')
const bcrypt = require('bcrypt-nodejs')
const UserModel = require('../Models/User')

const userController = {

  save: (req, res) => {
    //Recoger los parametros de la operacion
    const params = req.body

    //Validar los datos
    const nombre = !validator.isEmpty(params.nombre)
    const apellido = !validator.isEmpty(params.apellido)
    const email = validator.isEmail(params.email) && !validator.isEmpty(params.email)
    const password = !validator.isEmpty(params.password)

    if(nombre && apellido && email && password)
    {
      //Crear objeto del usuario
      const user = new UserModel()
      user.name = params.name
      user.apellido = params.apellido
      user.email = params.email
      user.image = null
      user.role = 'ROLE_USER'

      //Asignar valores al usuario
      UserModel.findOne({email: user.email}, (err, existUser) => {
          if(err) {
            return res.status(500).send({
              message: "Error al realizar la peticion"
            })
          }

          //Comprobar si el usuario existe
          if (!existUser) {
            //Cifrar la constraseña
            bcrypt.hash(params.password, null, null, (err, hash) => {
              user.password = hash

              //y guardar el usuario
              user.save((err, userSave) => {
                if(err){
                  return res.status(500).send({
                    message: "Error al registrar usuario"
                  })
                }

                if(!userSave){
                  return res.status(400).send({
                    message: "El usuario no se ha guardado"
                  })
                }

                return res.status(200).send({ user: userSave })
              })
              
              //Devolver respuesta
            })
          }else {
            //Si no existe 
            return res.status(201).send({
              message: "El usuario ya existe"
            })
          }
        })
      }
    }
}

module.exports = userController