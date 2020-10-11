'use strict'

const express = require('express')
const controllerComment = require('../Controllers/comment')
const {authenticated} = require('../Middlewares/authenticated')

const router = express.Router()

router.post('/comment/topic/:topicId', authenticated, controllerComment.add)
router.put('/comment/:commentId', authenticated, controllerComment.update)
router.delete('/comment/:topicId/:commentId', authenticated, controllerComment.delete)

module.exports = router