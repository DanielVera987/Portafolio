'use strict';

const ControllerLibro = require('../Controllers/libro');
const express = require('express');
const router = express.Router();

router.get('/', ControllerLibro.getLibros);

module.exports = router;
