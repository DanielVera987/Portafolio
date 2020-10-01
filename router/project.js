'use strict'

const express = require('express')
const { route } = require('../app')
const ProjectController = require('../controllers/project')

const router = express.Router()

router.post('/projects', ProjectController.saveProject)
router.get('/projects', ProjectController.getProjects)
router.get('/projects/:id', ProjectController.getProject)
router.put('/projects/:id', ProjectController.update)

module.exports = router