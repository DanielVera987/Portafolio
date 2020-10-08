'use strict'
const validator = require('validator')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../services/jwt')
const fs = require('fs')
const path = require('path')
const UserModel = require('../Models/User')

const userController = {

  save: (req, res) => {
    //Recoger los parametros de la operacion
    const params = req.body

    try{
      //Validar los datos
      const nombre = !validator.isEmpty(params.name)
      const apellido = !validator.isEmpty(params.apellido)
      const email = validator.isEmail(params.email) && !validator.isEmpty(params.email)
      const password = !validator.isEmpty(params.password)
    } catch (error) {
      return res.status(400).send({message: "Faltan datos por enviar"})
    }

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

    try{
      // validar los datos 
      const email = validator.isEmail(params.email) && !validator.isEmpty(params.email)
      const password = !validator.isEmpty(params.password)
    } catch (error) {
      return res.status(400).send({message: "Faltan datos por enviar"})
    }

    if(!email && !password){
      res.status(201).send({
        message: "Error al ingresar los datos"
      })
    }

    // buscar usuarios que conincidan con el email
    UserModel.findOne({email: params.email}, (err, user) => {
      if(err) return res.status(201).send({message: "Error al ingresar los datos"})

      if(!user) return res.status(400).send({message: "No existe una cuenta con ese email"})

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

  },

  update: (req, res) => {
    //Recoger los datos
    const params = req.body

    //Validar los datos
    try {
      const nombre = !validator.isEmpty(params.name)
      const apellido = !validator.isEmpty(params.apellido)
      const email = validator.isEmail(params.email) && !validator.isEmpty(params.email)
      const password = !validator.isEmpty(params.password)

      if(!nombre && !apellido && !email && !password){
       return res.status(400).send({message: "Faltan datos por enviar"})
      }
    } catch (error) {
      return res.status(400).send({message: "Faltan datos por enviar"})
    }

    const userId = req.user.sub

    console.log(req.user)

    // Eliminar propiedades incesarias
    delete params.password

    // Buscar y actualizar el usuario
    UserModel.findOneAndUpdate(userId, params, (err, user) => {

      if(err || !user) return res.status(500).send({message: "Error al acutalizar el usuario"})

      user.password = undefined

      return res.status(200).send({
        status: "success",
        user: user
      })
    })
  },

  uploadAvatar: (req, res) => {

    //configurar el modulo multyparty (md router.js)

    //Recoger el fichero
    let fileName = 'Avatar no subido'

    if(!req.files) return res.status(404).send({message: fileName})

    //conseguir el nombre  y la extencion
    const filePath = req.files.file0.path
    const fileSplit = filePath.split('\\')

    fileName = fileSplit[2]
    const ext = req.files.file0.type

    if (ext != 'image/jpeg' && ext != 'image/jpg' && ext != 'image/png' ){
      fs.unlink(filePath, (err) => {
        return res.status(401).send({
          status: "error",
          user: 'La extencion no es valida'
        })
      })
    }

    //sacar el id de usuario iiindetificado
    const userId = req.user.sub 

    UserModel.findOneAndUpdate(userId, {image: fileName}, {new: true}, (err, userUpdate) => {

      if(err){
        return res.status(500).send({
          status: "error",
          user: 'Error al subir imagen'
        })
      }

      return res.status(401).send({
        status: "success",
        user: userUpdate
      })
    })
  },

  getAvatar: (req, res) => {
    const fileName = req.params.fileName 
    const pathFile = `./uploads/user/${fileName}`

    fs.exists(pathFile,(exist) => {
      if(exist) {
        return res.status(200).send(path.resolve(pathFile))
      }else{
        return res.status(404).send({message: 'El archivo no exste'})
      }
    })
  },

  getUsers: (req, res) => {
    UserModel.find((err, users) => {
      if(err) return res.status(500).send({message: 'Error al obtener los usuarios'})
      if(!users) return res.status(201).send({message: 'No hay usuarios'})

      return res.status(200).send({
        status: 200,
        message: users
      })
    })
  },

  getUser: (req, res) => {
    const userId = req.params.id

    UserModel.findById(userId, (err, user) => {
      if(err) return res.status(500).send({message: 'Error al obtener el usuario'})
      if(!user) return res.status(404).send({message: 'El usuario no existe'})

      return res.status(200).send({
        status: 200,
        message: user
      })
    })
  },
}

module.exports = userController