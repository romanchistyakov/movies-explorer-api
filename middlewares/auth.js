const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAuthorizedError('Необходима авторизация!'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    next(new NotAuthorizedError('Необходима авторизация!'));
  }

  req.user = payload;

  next();
};
