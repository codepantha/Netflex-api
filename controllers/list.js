const { StatusCodes } = require('http-status-codes');
const NotFoundError = require('../errors/notFound');
const List = require('../models/List');

const create = async (req, res) => {
  const list = await List.create(req.body);
  res.status(StatusCodes.CREATED).json({ list });
};

const destroy = async (req, res) => {
  const list = await List.findByIdAndDelete(req.params.id);
  if (!list) throw new NotFoundError('list not found');

  res.status(StatusCodes.OK).json({ msg: 'list deleted successfully!' });
};

module.exports = {
  create,
  destroy
};
