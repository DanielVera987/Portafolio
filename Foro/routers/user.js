'use strict'

const express = require('express')
const userController = require('../Controllers/user')

const router = express.Router()

router.post('/user', userController.save)

module.exports = router