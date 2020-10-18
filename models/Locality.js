const mongoose = require('mongoose')

const LocalitySchema = new mongoose.Schema({
  ID: String,
  Name: String,
  Type: String,
  X: Number,
  Y: Number,
  children: Array
})

module.exports = Locality = mongoose.model('localities', LocalitySchema)
