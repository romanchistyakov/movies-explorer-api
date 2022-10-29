const router = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validations');

const {
  updateUser, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
