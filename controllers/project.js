'use strict'

const Project = require('../model/Project')
const controller = {

  saveProject: (req, res) => {
    Project.create(req.body)
           .then(x => res.status(201).send(x))
  },

  getProject: (req, res) => {
    Project.findById(req.params.id).then(x => res.status(200).send(x))
  },

  getProjects: (req, res) => {
    Project.find().exec().then(x => res.status(200).send(x))
  },

  update: (req, res) => {
    Project.findOneAndUpdate(req.params.id, req.body).then(x => res.status(204).send(x))
  }
  
}

module.exports = controller