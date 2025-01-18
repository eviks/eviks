const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
      required: true,
    },
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Chat = mongoose.model('chats', ChatSchema);

module.exports = Chat;
