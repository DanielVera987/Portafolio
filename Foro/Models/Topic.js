'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentsSchema = Schema({
  content: String,
  date: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Comment', CommentsSchema)

const TopicSchema = Schema({
  title: String,
  content: String,
  code: String,
  lang: String,
  date: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' },
  comments: [CommentsSchema]
})

module.exports = mongoose.model('Topic', TopicSchema)