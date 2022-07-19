const UnauthorizedError = require('../errors/unauthorized');

const adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin)
    throw new UnauthorizedError('Access denied for this action.');
  next();
};

module.exports = adminMiddleware;
