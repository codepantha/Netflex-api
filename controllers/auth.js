const CustomAPIError = require('../errors/customApi');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const UnauthenticatedError = require('../errors/unauthenticated');

const register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  const user = await newUser.save();

  if (user) res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    throw new UnauthenticatedError(
      'Invalid Credentials',
      StatusCodes.UNAUTHORIZED
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect)
    throw new UnauthenticatedError(
      'Invalid Credentials',
      StatusCodes.UNAUTHORIZED
    );
  delete user._doc.password;

  const accessToken = user.createJWT();
  res.status(StatusCodes.OK).json({ data: user, accessToken });
};

module.exports = {
  register,
  login
};
