const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../errors/customApi');

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something bad happened. Please try later.'
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    const field = Object.keys(err.keyValue)[0];
    customError.message = `${err.keyValue[field]} already exists. Please choose another ${field}`;
  }

  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map((error) => error.message)
      .join('');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
