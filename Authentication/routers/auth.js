'use strict'
const express = require('express')
const controllerAuth = require('../Controllers/auth')

const router = express.Router()

router.post('/register', controllerAuth.register)
router.post('/auth', controllerAuth.auth)
router.get('/me', controllerAuth.me)

module.exports = router