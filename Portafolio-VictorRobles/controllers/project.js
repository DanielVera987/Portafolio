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
  },

  delete: (req, res) => {
    Project.findOneAndDelete(req.params.id).then(x => res.sendStatus(204))
  },

  uploadImage: (req, res) => {
    let projectId = req.params.id;
    let fileName = 'Imagen no subida...'

    if (req.files) {
      fileName = req.files.file.name

      Project.findOneAndUpdate(projectId, {image: fileName})
             .then(doc => res.status(200).send(doc))
             .catch(err => res.status(400).send(err))
    }else{
      res.send(fileName)
    }
  }
}

module.exports = controller