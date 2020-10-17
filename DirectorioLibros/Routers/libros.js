'use strict';

const ControllerLibro = require('../Controllers/libro');
const express = require('express');
const router = express.Router();

router.get('/libros', ControllerLibro.getLibros);
router.post('/libros', ControllerLibro.create);
router.post('/libros/:id', ControllerLibro.getById);
router.put('/libros/:id', ControllerLibro.update);

module.exports = router;
