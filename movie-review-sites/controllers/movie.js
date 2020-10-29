'use strict';
const ModelMovie = require('../models/Movie');
const validator = require('validator');

const movieController = {

  index: (req, res) => {
    ModelMovie.find()
      .then(movies => {
        return res.render('index', {
          movies
        });
      })
      .catch(err => console.log(err));
  }, 

  getById: (req, res) => {

  },

  viewAdd: (req, res) => {
    return res.render('movieadd', { message: 'New Movie'});
  }, 

  add: (req, res) => {
    let title = (validator.isEmpty(req.body.title)) ? false : req.body.title;
    let author = (validator.isEmpty(req.body.author)) ? false : req.body.author;
    let description = (validator.isEmpty(req.body.description)) ? false : req.body.description;
    let year = (validator.isEmpty(req.body.year)) ? false : req.body.year;
    let image = (validator.isEmpty(req.body.image)) ? false : req.body.image;

    if (!title || !author || !description || !year || !image) {
      return res.render('movieadd', {
        message: 'Complete the data'
      });
    }

    ModelMovie.create({
      title,
      author,
      description,
      year,
      image
    })
    .then(movie => {
      return res.render('movieadd', {
        message: 'Movie created'
      });
    })
    .catch(err => res.render('movieadd', { message: 'Complete los datos'}))
  },

  viewUpdate: (req, res) => {

  },

  update: (req, res) => {

  },

  delete: (req, res) => {
    
  }
}

module.exports = movieController;