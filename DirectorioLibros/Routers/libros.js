'use strict';

const ControllerLibro = require('../Controllers/libro');
const express = require('express');
const router = express.Router();

router.get('/libros', ControllerLibro.getLibros);
router.post('/libros', ControllerLibro.create);

module.exports = router;
