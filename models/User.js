const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    activationToken: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
      index: true,
    },
    activationTokenExpires: Date,
    resetPasswordToken: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
      index: true,
    },
    resetPasswordExpires: Date,
    googleId: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
      index: true,
    },
    picture: String,
    favorites: Object,
    subscriptions: {
      type: [
        {
          name: String,
          url: String,
          deviceToken: String,
          notify: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
    devices: [String],
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'moderator'],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('users', UserSchema);
module.exports = User;
