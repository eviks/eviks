const mongoose = require('mongoose');
const basePostSchema = require('./basePostSchema');

const PostSchema = new mongoose.Schema(
  {
    ...basePostSchema,
    reviewStatus: {
      type: String,
      enum: ['onreview', 'confirmed'],
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;
