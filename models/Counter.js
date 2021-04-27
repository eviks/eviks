const mongoose = require('mongoose')

const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  seq: {
    type: Number,
    required: true,
  },
})

module.exports = Counter = mongoose.model('counters', CounterSchema)
