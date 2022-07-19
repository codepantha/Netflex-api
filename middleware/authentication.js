const UnauthenticatedError = require("../errors/unauthenticated");
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.token;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnauthenticatedError('token not provided');

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    const { userId, isAdmin } = payload;
    req.user = { userId, isAdmin };
    next();
  } catch (err) {
    throw new UnauthenticatedError('Not authorized to access this route');
  }
}

module.exports = authMiddleware;
