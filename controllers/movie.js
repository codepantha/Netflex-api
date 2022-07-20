const { StatusCodes } = require('http-status-codes');
const NotFoundError = require('../errors/notFound');
const Movie = require('../models/Movie');

const index = async (req, res) => {
  const movies = await Movie.find();
  res
    .status(StatusCodes.OK)
    .json({ movies: movies.reverse(), nbHits: movies.length });
};

const show = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) throw new NotFoundError('movie not found');

  res.status(StatusCodes.OK).json({ movie });
};

const create = async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(StatusCodes.CREATED).json({ movie });
};

const update = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    { new: true }
  );

  if (!movie) throw new NotFoundError('movie not found');

  res.status(StatusCodes.OK).json({ movie });
};

const destroy = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) throw new NotFoundError('movie not found');

  res.status(StatusCodes.OK).json({ msg: 'movie deleted successfully!' });
};

/*
 * Any user can get a random movie
 * The user can specify ?type=series to get a random series
 * Otherwise they'd get a random movie
 */
const getRandomMovie = async (req, res) => {
  const { type } = req.query;
  let movie;

  if (type === 'series') {
    movie = await Movie.aggregate([
      { $match: { isSeries: true } },
      { $sample: { size: 1 } }
    ]);
  } else {
    movie = await Movie.aggregate([
      { $match: { isSeries: false } },
      { $sample: { size: 1 } }
    ]);
  }

  res.status(StatusCodes.OK).json({ movie });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  getRandomMovie
};
