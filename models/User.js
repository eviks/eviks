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
    savedSearches: {
      type: [
        {
          id: String,
          name: String,
          url: String,
        },
      ],
      default: [],
    },
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
