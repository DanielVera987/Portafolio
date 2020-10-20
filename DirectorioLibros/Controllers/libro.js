'use strict';

const ModelLibro = require('../Models/Libro');

const ControllerLibro = {

  getLibros: (req, res) => {
    ModelLibro
      .find()
      .exec()
      .then(x => res.status(200).send(x))
      .catch(err => res.status(500).send(err))
  },

  create: (req, res) => {
    const data = req.body;

    if(data.titulo == '' || 
       data.autor == '' ||
       data.anio == '' ||
       data.edicion == '' ||
       data.paginas == '' || 
       data.portada == '' || 
       data.descripcion == ''){
      return res.status(201).send('Faltan datos');
    }

    ModelLibro.create(params).then(x => res.status(200).send(x))


  },

  getById: (req, res) => {
    const id = req.params.id;

    ModelLibro
      .findById(id)
      .exec()
      .then(x => res.status(200).send(x))
      .catch(err => res.status(500).send(err))
  },

  update: (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if(data.titulo == '' || 
       data.autor == '' ||
       data.anio == '' ||
       data.edicion == '' ||
       data.paginas == '' || 
       data.portada == '' || 
       data.descripcion == ''){
      return res.status(201).send('Faltan datos');
    }

    ModelLibro
      .findOneAndUpdate(id, data)
      .exec()
      .then(x => res.status(200).send(x))

  },

  delete: (req, res) => {
    const id = req.params.id;

    ModelLibro
      .findOneAndDelete(id)
      .exec()
      .
  }
};

module.exports = ControllerLibro;