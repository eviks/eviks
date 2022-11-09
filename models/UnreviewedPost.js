const mongoose = require('mongoose');
const BasePostSchema = require('./schemas/BasePostSchema');
const BlockingSchema = require('./schemas/BlockingSchema');

const UnreviewedPostSchema = new mongoose.Schema(
  {
    ...BasePostSchema,
    rereview: Boolean,
    blocking: { type: BlockingSchema, required: false },
  },
  {
    timestamps: true,
  },
);

const UnreviewedPost = mongoose.model('unreviewedPosts', UnreviewedPostSchema);

module.exports = UnreviewedPost;
