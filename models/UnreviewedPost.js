const mongoose = require('mongoose');
const basePostSchema = require('./basePostSchema');

const UnreviewedPostSchema = new mongoose.Schema(
  {
    ...basePostSchema,
    rereview: Boolean,
    blocking: {
      type: {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true,
        },
        blockingExpires: { type: Date, required: true },
      },
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('unreviewedPosts', UnreviewedPostSchema);

module.exports = Post;
