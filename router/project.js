'use strict'

const express = require('express')
const ProjectController = require('../controllers/project')

const router = express.Router()

const multyParty = require('connect-multiparty')
const multyPartyMidleware = multyParty({ uploadDir: './uploads' })

router.post('/projects', ProjectController.saveProject)
router.get('/projects', ProjectController.getProjects)
router.get('/projects/:id', ProjectController.getProject)
router.put('/projects/:id', ProjectController.update)
router.delete('/projects/:id', ProjectController.delete)
router.post('/uploadimagen/:id', multyPartyMidleware ,ProjectController.uploadImage)

module.exports = router