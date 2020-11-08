const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  displayName: String,
  email: String,
  password: String,
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
  resetPasswordExpires: Date,
  favorites: Object
})

module.exports = User = mongoose.model('user', UserSchema)
