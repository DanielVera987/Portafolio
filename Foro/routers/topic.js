'use strict'

const express = require('express')
const controllerTopic = require('../Controllers/topic')
const {authenticated} = require('../Middlewares/authenticated')

const router = express.Router()

router.post('/topic', authenticated, controllerTopic.save)
router.get('/topics/:page?', authenticated, controllerTopic.topics)

module.exports = router