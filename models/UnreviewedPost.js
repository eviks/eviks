const mongoose = require('mongoose');
const basePostSchema = require('./basePostSchema');

const UnreviewedPostSchema = new mongoose.Schema(
  { ...basePostSchema, rereview: Boolean },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('unreviewedPosts', UnreviewedPostSchema);

module.exports = Post;
