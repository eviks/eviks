const mongoose = require('mongoose');
const basePostSchema = require('./basePostSchema');

const ArchivedPostSchema = new mongoose.Schema(
  { ...basePostSchema },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('archivedPosts', ArchivedPostSchema);

module.exports = Post;
