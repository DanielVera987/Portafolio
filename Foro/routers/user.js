'use strict'

const express = require('express')
const userController = require('../Controllers/user')
const {authenticated} = require('../Middlewares/authenticated')

const router = express.Router()
const multiparty = require('connect-multiparty')
const md_upload = multiparty( { uploadDir: './uploads/user'} )

router.post('/login', userController.login)

router.post('/user', userController.save)
router.get('/users', authenticated ,userController.getUsers)
router.get('/user/:id', authenticated ,userController.getUser)
router.put('/user', authenticated, userController.update)

router.post('/upload-avatar/:id', [authenticated, md_upload], userController.uploadAvatar)
router.get('/avatar/:fileName', userController.getAvatar)

module.exports = router