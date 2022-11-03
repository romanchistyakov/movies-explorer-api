const router = require('express').Router();

const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { validateSignin, validateSignup } = require('../middlewares/validations');

router.post('/signin', validateSignin, login);
router.post('/signup', validateSignup, createUser);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);
router.use('/', (req, res, next) => next(new NotFoundError('Страница не найдена!')));

module.exports = router;
