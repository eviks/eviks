const mongoose = require('mongoose');
const BasePostSchema = require('./schemas/BasePostSchema');

const ArchivedPostSchema = new mongoose.Schema(
  { ...BasePostSchema },
  {
    timestamps: true,
  },
);

const ArchivedPost = mongoose.model('archivedPosts', ArchivedPostSchema);

module.exports = ArchivedPost;
