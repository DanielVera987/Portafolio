'use strict'
const express = require('express')

const router = express.Router()

router.post('/register', (req, res) => {
  return res.status(200).send({
    message: 'Register'
  })
})

router.post('/auth', (req, res) => {
  return res.status(200).send({
    message: 'Auth'
  })
})

router.get('/me', (req, res) => {
  return res.status(200).send({
    message: 'Me'
  })
})

module.exports = router