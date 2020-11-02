const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const movieController = require('../controllers/movie');

router
  .get('/', movieController.index)
  .get('/movie', movieController.viewAdd)
  .post('/movie', movieController.add)
  .get('/update/:id', movieController.viewUpdate)
  .post('/update/:id', movieController.update)

  .get('/register', userController.viewRegister)
  .post('/register', userController.register)
  
  .get('/login', userController.viewLogin)
  .post('/login', userController.login)


module.exports = router;