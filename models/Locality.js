const mongoose = require('mongoose')

const LocalitySchema = new mongoose.Schema({
  id: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  routeName: { type: String, index: true },
  type: { type: String, required: true, index: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  children: Array,
})

module.exports = Locality = mongoose.model('localities', LocalitySchema)
