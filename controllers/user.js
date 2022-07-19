const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized');
const NotFoundError = require('../errors/notFound');

const index = async (req, res) => {
  const { latest } = req.query;

  const users = latest
    ? await User.find().sort({ _id: -1 }).limit(10)
    : await User.find();

  res.status(StatusCodes.OK).json({ users, nbHits: users.length });
};

const show = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new NotFoundError('user not found');

  res.status(StatusCodes.OK).json({ user });
};

const update = async (req, res) => {
  const {
    params: { id },
    body: { password },
    user: { userId }
  } = req;

  if (userId !== id && !req.user.isAdmin)
    throw new UnauthorizedError('You are authorized to edit only your account');

  if (password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: req.body
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ user });
};

const destroy = async (req, res) => {
  if (req.user.userId !== req.params.id && !req.user.isAdmin)
    throw new UnauthorizedError(
      'You are authorized to delete only your account'
    );

  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new NotFoundError('user not found.');

  res.status(StatusCodes.OK).json({ msg: 'user deleted successfully! ' });
};

module.exports = {
  index,
  show,
  update,
  destroy
};
