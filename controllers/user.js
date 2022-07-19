const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const update = async (req, res) => {
  const { params: { id }, body: { password } } = req;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, {
    $set: req.body
  }, { new: true, runValidators: true })

  res.status(StatusCodes.OK).json({ user });
}

module.exports = {
  update
};
