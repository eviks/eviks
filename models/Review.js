const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  date: { type: Date, required: true },
  result: Boolean,
  comment: String,
});

const Review = mongoose.model('reviews', ReviewSchema);

module.exports = Review;
