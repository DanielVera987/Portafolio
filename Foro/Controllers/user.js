'use strict'
const validator = require('validator')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../services/jwt')
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
  },

  login: (req, res) => {
    //Recoger los datos usuario
    const params = req.body

    // validar los datos 
    const email = validator.isEmail(params.email) && !validator.isEmpty(params.email)
    const password = !validator.isEmpty(params.password)

    if(!email && !password){
      res.status(201).send({
        message: "Error al ingresar los datos"
      })
    }

    // buscar usuarios que conincidan con el email
    UserModel.findOne({email: params.email}, (err, user) => {
      if(err) res.status(201).send({message: "Error al ingresar los datos"})

      if(!user) res.status(400).send({message: "No existe una cuenta con ese email"})

      // comprobar las contraseñas (conscidencisa de email y password)
      bcrypt.compare(params.password, user.password, (err, check) => {
        if(err) res.status(201).send({message: "La contraseña no es correcta"})

        if(check){
          
          // generar token con jwt y devolverlo
          if (params.getToken) {
            return res.status(200).send({
              token: jwt.createToken(user)
            })
          } else {
            // liimpiar la password al devolve el usuario 
            user.password = undefined
                
            // devolver los datos           
            return res.status(200).send({
              status: "success",
              user
            })
          }
          
        }

      })
    })

  }
}

module.exports = userController