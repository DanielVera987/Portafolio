'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibroModel = new Schema({
  titulo: { type: String },
  autor: { type: String },
  anio: { type: String },
  edicion: { type: String },
	paginas: { type: String },
	portada: { type: String },
	descripcion: { type: String }
});

module.exports = mongoose.model('libros', LibroModel);