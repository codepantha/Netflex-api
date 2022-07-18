const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true
    },
    email: {
      type: String,
      require: [true, 'email is required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'password field is required']
    },
    profilePic: {
      type: String,
      default: ''
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
