const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router
  .get('/', (req, res) => res.render('index'))

  .get('/register', userController.viewRegister)
  .post('/register', userController.register)
  
  .post('/login', userController.login)


module.exports = router;