'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const clave = 'clave-secreta-para-generar-el-token'

exports.authenticated = (req, res, next) => {

  //Comprobar de que llege la auteticacion
  if(!req.headers.authorization){
    return res.status(400).send({message: "La peticion no tiene en la cabecera la autenticacion"})
  }

  // limpiar el token y quitar las comilllas
  const token = req.headers.authorization.replace(/['"]+/g, '')

  try {
    // decodificar token
    const payload = jwt.decode(token, clave)

    //comprobar si token se a expirado
    if(payload.exp <= moment().unix()){
      return res.status(400).send({
        message: "El token sea expirado"
      })
    }

  } catch (error) {
    return res.status(400).send({
      message: "El token no es valido"
    })
  }
  // decodificar el token 

  // comprobar si el token a caducado

  // adjuntar usuario en el req el

  // pasar a la accion

  next()
}