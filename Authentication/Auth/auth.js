'use strict'

const controllerAuth = {

  register: (req, res) => {
    return res.status(200).send({
      message: 'Register'
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