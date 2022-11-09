const mongoose = require('mongoose');

const ReviewHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    date: { type: Date, required: true },
    result: Boolean,
    comment: String,
  },
  { _id: false },
);

module.exports = ReviewHistorySchema;
