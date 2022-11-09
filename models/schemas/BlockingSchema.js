const mongoose = require('mongoose');

const BlockingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    username: { type: String, required: true },
    blockingExpires: { type: Date, required: true },
  },
  { _id: false },
);

module.exports = BlockingSchema;
