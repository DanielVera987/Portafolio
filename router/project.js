'use strict'

const express = require('express')
const { route } = require('../app')
const ProjectController = require('../controllers/project')
const Project = require('../model/Project')

const router = express.Router()

router.post('/projects', ProjectController.saveProject)
router.get('/projects', ProjectController.getProjects)
router.get('/projects/:id', ProjectController.getProject)
router.put('/projects/:id', ProjectController.update)
router.delete('/projects/:id', ProjectController.delete)

module.exports = router