'use strict'

const express = require('express')
const controllerTopic = require('../Controllers/topic')
const {authenticated} = require('../Middlewares/authenticated')

const router = express.Router()

router.post('/topic', authenticated, controllerTopic.save)
router.get('/topics/:page?', authenticated, controllerTopic.topics)
router.get('/user-topics/:user?', controllerTopic.getTopicsByUser)
router.get('/topic/:id', controllerTopic.getTopic)
router.put('/topic/:id', authenticated ,controllerTopic.update)
router.delete('/topic/:id', authenticated, controllerTopic.delete)

module.exports = router