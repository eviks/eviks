const mongoose = require('mongoose');
const BasePostSchema = require('./schemas/BasePostSchema');

const PostSchema = new mongoose.Schema(
  {
    ...BasePostSchema,
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
