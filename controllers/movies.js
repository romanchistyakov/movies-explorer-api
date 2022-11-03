const Movie = require('../models/movies');
const WrongDataError = require('../errors/WrongDataError');
const NotFoundError = require('../errors/NotFoundError');
const NotAuthorizedCardError = require('../errors/NotAuthorizedCardError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new WrongDataError('Переданы некорректные данные при сохранении фильма.'));
      } else {
        next(error);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .orFail(() => { throw new NotFoundError('Фильм по указанному _id не найден.'); })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new NotAuthorizedCardError('Фильм принадлежит другому пользователю.');
      }
      Movie.findByIdAndDelete(_id)
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new WrongDataError('Передан некорректный _id фильма'));
      } else {
        next(error);
      }
    });
};
