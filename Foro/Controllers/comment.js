'use strict'

const TopicModel = require('../Models/Topic')
const validator = require('validator')
const Topic = require('../Models/Topic')

const commentController = {
  add: (req, res) => {
    const topicId = req.params.topicId

    TopicModel.findById(topicId).exec((err, topic) => {
      if(err) return res.status(500).send({message: 'Error'})
      if(!topic) return res.status(404).send({message: 'No existe el topic'})

      if(req.body.content){

        try {
          const content = !validator.isEmpty(params.content)

          if(!content) return res.status(400).send({message: 'No se ha validado los datos'})
        } catch (error) {
          if(!content) return res.status(400).send({message: 'No se ha validado los datos'})
        }

        var comment = {
          user: req.user.sub,
          comment: req.body.content 
        }

        topic.comments.push(comment)

        topic.save((err) => {

          return res.status(200).send({
            status: 'success',
            topic
          })
        }) 
      }
    })
  },

  update: (req, res) => {
    const commentId = req.params.commentId

    try {
      const content = !validator.isEmpty(params.content)

      if(!content) return res.status(400).send({message: 'No se ha validado los datos'})
    } catch (error) {
      if(!content) return res.status(400).send({message: 'No se ha validado los datos'})
    }

    TopicModel.findByIdAndUpdate(
      {"comment._id": commentId},
      {
        "$set": {
          "comments.$.content": params.content
        }
      },
      {new: true}, 
      (err, topicUpdate) => {
        if(err) return res.status(500).send({message: 'Error'})
        if(!topicUpdate) return res.status(404).send({message: 'No existe el topic'})

        return res.status(200).send({
          status: 'success',
          topic: topicUpdate
        })
      })
  },

  delete: (req, res) => {
    const topicId = req.params.topicId
    const commentId = req.params.commentId

    TopicModel.findById(topicId, (err, topic) => {
      if(err) return res.status(500).send({message: 'Error'})
      if(!topic) return res.status(404).send({message: 'No existe el topic'})

      const comment = topic.comments.id(commentId)

      if(!comment) return res.status(404).send({message: 'No existe el comentario'})

      comment.remove()

      topic.save((err, topic) => {
        if(err) return res.status(500).send({message: 'Error'})
        if(!topic) return res.status(404).send({message: 'No existe el topic'})

        res.status(200).send({
          status: 'success',
          topic
        })
      })
    })
  },
}

module.exports = commentController