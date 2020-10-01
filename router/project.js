'use strict'

const express = require('express')
const { route } = require('../app')
const ProjectController = require('../controllers/project')

const router = express.Router()

router.get('/home', ProjectController.home)
router.get('/test', ProjectController.test)
router.get('/save', ProjectController.saveProject)
router.get('/projects', ProjectController.getProjects)

module.exports = router