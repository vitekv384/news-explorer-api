const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const NotAutorizedError = require('../errors/not-autorized-error');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`${err.message}`));
      }
    });
};

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  if (!password) {
    throw new NotFoundError('Формат пароля неверен');
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Ошибка валидации ${err.message}`));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        const e = new Error('Данный email уже используется');
        e.statusCode = 409;
        return next(e);
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 604800,
        sameSite: none,
      });
      res.send({ token });
    })
    .catch((err) => {
      const e = (new NotAutorizedError(`${err.message}`));
      next(e);
    });
};
