'use strict'

const Project = require('../model/Project')
const controller = {

  home: (req, res) => {
    return res.status(200).send({
      message: "soy la home"
    })
  },
  
  test: (req, res) => {
    return res.status(200).send({
      message: "soy la test"
    })
  },

  saveProject: (req, res) => {
    Project.create(req.body)
           .then(x => res.status(201).send(x))
  }
}

module.exports = controller