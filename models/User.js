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
    activationToken: {
      type: String
    },
    active: {
      type: Boolean,
      default: false
    },
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpires: {
      type: Date
    }
  }
});

module.exports = User = mongoose.model('user', UserSchema);
