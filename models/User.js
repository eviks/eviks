const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      validate: /^[a-zA-Z0-9_-]+$/,
      unique: true,
      trim: true,
      index: true,
    },
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
      required: true,
      trim: true,
    },
    activationToken: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
      index: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
      index: true,
    },
    activationTokenExpires: Date,
    resetPasswordExpires: Date,
    favorites: Object,
  },
  {
    timestamps: true,
  },
);

module.exports = User = mongoose.model('user', UserSchema);
