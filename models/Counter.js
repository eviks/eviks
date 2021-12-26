const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  _id: String,
  seq: {
    type: Number,
    required: true,
  },
});

const Counter = mongoose.model('counters', CounterSchema);

module.exports = Counter;
