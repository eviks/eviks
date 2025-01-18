const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'chats',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    readBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true,
        },
      ],
    },
  },
  { timestamps: true },
);

const Message = mongoose.model('messages', MessageSchema);

module.exports = Message;
