const mongoose = require('mongoose');
const BasePostSchema = require('./schemas/BasePostSchema');

const PostSchema = new mongoose.Schema(
  {
    ...BasePostSchema,
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;
