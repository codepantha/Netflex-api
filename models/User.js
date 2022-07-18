const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (passwordInput) {
  const isMatch = await bcrypt.compare(passwordInput, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, isAdmin: this.isAdmin },
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

module.exports = mongoose.model('User', UserSchema);
