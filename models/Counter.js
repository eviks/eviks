const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  _id: String,
  seq: {
    type: Number,
    required: true,
  },
});

module.exports = Counter = mongoose.model('counters', CounterSchema);
