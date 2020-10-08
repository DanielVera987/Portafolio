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
  }
}

module.exports = controllerTopic