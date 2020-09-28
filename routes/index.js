const routers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const articleRouter = require('./articles');
const usersRouter = require('./users');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

routers.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

routers.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

routers.use(auth);

routers.use('/articles', articleRouter);
routers.use('/users', usersRouter);

module.exports = routers;
