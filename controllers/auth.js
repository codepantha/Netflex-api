const User = require('../models/User');

const register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  
  const user = await newUser.save();

  if (user) res.status(201).json({ user });
}

module.exports = {
  register
};