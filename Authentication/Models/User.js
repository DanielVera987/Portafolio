'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  nombre: { type: String },
  email: { type: String },
  password: { type: String },
})

UserSchema.methods.toJSON = function(){
  const obj = this.toObject()
  delete obj.password

  return obj
}

module.exports = mongoose.model('User', UserSchema)