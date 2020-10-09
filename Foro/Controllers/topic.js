'use strict'

const validator = require('validator')
const TopicModel = require('../Models/Topic')

const controllerTopic = {

  topics: (req, res) => {
    let page = (!req.params.page) ? "1" : req.params.page

    var options = {
      sort: { date: -1 },
      populate: 'user',
      limit: 5,
      page
    }

    TopicModel.paginate({}, options, (err, topics) => {
      if(err || !topics) return res.status(201).send({message: 'Error al obtener los temas'})
  
      return res.status(200).send({
          status: 'success',
          topics: topics.docs,
          totalDocs: topics.totalDocs,
          totalPages: topics.totalPages
        })
    })
  },

  save: (req, res) => {

    // Recibir los parametros
    const params = req.body

    // Validar los datos
    try{
      const title = !validator.isEmpty(params.title)
      const content = !validator.isEmpty(params.content)
      const code = !validator.isEmpty(params.code)
      const lang = !validator.isEmpty(params.lang)

      if(!title && !content && !code && !lang) return res.status(201).send({message: 'Algunos campos estan vacios'})
    }catch(err){
      return res.status(201).send({message: 'Faltan datos'})
    }

    // Crear objeto 
    const newTopic = new TopicModel()
    
    // Asignar valores
    newTopic.title = params.title
    newTopic.content = params.content
    newTopic.code = params.code 
    newTopic.lang = params.lang
    newTopic.user = req.user.sub

    // Guardar valores
    newTopic.save((err, topicSave) => {
      if(err || !topicSave) return res.status(201).send({message: 'Error al guardar Topic'})

      // Devolvemos respuesta 
      return res.status(200).send({message: 'Topic creado con exito'})
    })
  },

  getTopicsByUser: (req, res) => {
    //Recoger el usuario
    const userId = req.params.user 

    // Obtener con una condicion 
    TopicModel.find({user: userId})
              .sort([['date', 'descending']])
              .exec((err, topics) => {
                if(err) return res.status(500).send({message: 'Error en la peticion'})
                if(!topics) return res.status(404).send({message: 'No hay temas para mostrar'})

                return res.status(200).send({
                  status: 'success',
                  topics
                })
              })
  },

  getTopic: (req, res) => {
    const topicId = req.params.id 

    TopicModel.findById(topicId)
              .populate('user')
              .exec((err,topic) => {
                if(err) return res.status(500).send({message: 'Error en el servidor'})
                if(!topic) return res.status(404).send({message: 'No existe el topic'})

                return res.status(200).send({
                  status: 'success',
                  topic 
                })
              })
  }, 

  update: (req, res) => {
    const topicId = req.params.id 

    const params = req.body

    try{
      const title = !validator.isEmpty(params.title)
      const content = !validator.isEmpty(params.content)
      const code = !validator.isEmpty(params.code)
      const lang = !validator.isEmpty(params.lang)

      if(!title && !content && !code && !lang) return res.status(201).send({message: 'Algunos campos estan vacios'})
    }catch(err){
      return res.status(201).send({message: 'Faltan datos'})
    }

    const update = {
      title: params.title,
      content: params.content,
      code: params.code,
      lang: params.lang,
    }

    TopicModel.findByIdAndUpdate({_id: topicId, user: req.user.sub}, update, {new: true} ,(err,topic) => {
      if(err) return res.status(500).send({message: 'Error'})

      if(!topic) return res.status(404).send({message: 'El topic no fue actualizado'})

      return res.status(200).send({message: 'El topic fue actualizado exitosamente'})
    })
  },

  delete: (req, res) => {
    const topicId = req.params.id

    TopicModel.findByIdAndDelete({_id: topicId, user: req.user.userId}, (err, topicDelete) => {
      if(err) return res.status(500).send({message: 'Error al borrar topic'})
      if(!topicDelete) return res.status(404).send({message: 'Topic no existe'})

      return res.status(200).send({message: 'Topic borrado exitosamente'})
    })
  },
}

module.exports = controllerTopic