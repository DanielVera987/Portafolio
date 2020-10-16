'use strict';

const ModelLibro = require('../Models/Libro');

const ControllerLibro = {

  getLibros: (req, res) => {
    ModelLibro.create({
      titulo: 'Spiderman'
    })
    .then(x => console.log(x))

    res.status(200).send('Ruta get controllers');
  },

};

module.exports = ControllerLibro;