const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    activationToken: String,
    active: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      unique: true,
    },
    resetPasswordExpires: Date,
    favorites: Object,
  },
  { timestamps: true }
)

module.exports = User = mongoose.model('user', UserSchema)
