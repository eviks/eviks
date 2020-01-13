const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  local: {
    displayName: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    activationToken: String,
    active: {
      type: Boolean,
      default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  }
});

module.exports = User = mongoose.model('user', UserSchema);
