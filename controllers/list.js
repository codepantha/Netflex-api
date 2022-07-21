const { StatusCodes } = require('http-status-codes');
const NotFoundError = require('../errors/notFound');
const List = require('../models/List');

/*
 * Authenticated users can get 10 lists
 * the url accepts ?type&genre queries
 */
const index = async (req, res) => {
  const { type, genre } = req.query;
  let list;

  if (!type && !genre) list = await List.aggregate([{ $sample: { size: 10 } }]);

  if (type && !genre)
    list = await List.aggregate([
      { $match: { type } },
      { $sample: { size: 10 } }
    ]);

  if (!type && genre)
    list = await List.aggregate([
      { $match: { genre } },
      { $sample: { size: 10 } }
    ]);

  if (type && genre) {
    list = await List.aggregate([
      { $match: { type, genre } },
      { $sample: { size: 10 } }
    ]);
  }

  res.status(StatusCodes.OK).json({ list, nbHits: list.length });
};

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
  index,
  create,
  destroy
};
