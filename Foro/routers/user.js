'use strict'

const express = require('express')
const userController = require('../Controllers/user')
const {authenticated} = require('../Middlewares/authenticated')

const router = express.Router()
const multiparty = require('connect-multiparty')
const md_upload = multiparty( { uploadDir: './uploads/user'} )

router.post('/login', userController.login)

router.post('/user', userController.save)
router.put('/user', authenticated, userController.update)

router.post('/upload-avatar/:id', [authenticated, md_upload], userController.uploadAvatar)

module.exports = router