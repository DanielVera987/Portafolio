'use strict'

const express = require('express')
const userController = require('../Controllers/user')
const {authenticated} = require('../Middlewares/authenticated')

const router = express.Router()

router.post('/login', userController.login)

router.post('/user', userController.save)
router.put('/user', authenticated, userController.update)

module.exports = router