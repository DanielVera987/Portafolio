'use strict';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const Project = mongoose.model('project', new Schema({
  name: String,
  description: String,
  category: String,
  year: Number,
  langs: String,
  image: String,
}))

module.exports = Project