const mongoose = require('mongoose')

const RegionSchema = new mongoose.Schema({
  ID: String,
  Name: String,
  Type: String,
  X: Number,
  Y: Number,
  children: Array
})

module.exports = Region = mongoose.model('regions', RegionSchema)
