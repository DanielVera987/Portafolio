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
    const params = req.body;

    if(params.titulo == '' || 
       params.autor == '' ||
       params.anio == '' ||
       params.edicion == '' ||
       params.paginas == '' || 
       params.portada == '' || 
       params.descripcion == ''){
      return res.status(201).send('Faltan datos');
    }

    ModelLibro.create(params).then(x => res.status(200).send(x))


  },

};

module.exports = ControllerLibro;