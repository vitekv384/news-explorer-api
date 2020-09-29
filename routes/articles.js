const routers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlValidator = require('../utils/custom-validator');
const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

routers.get('/', getArticles);

routers.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().length(24).hex(),
  }),
}), deleteArticle);

routers.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((link) => urlValidator(link)),
    image: Joi.string().required().custom((link) => urlValidator(link)),
  }),
}), createArticle);

module.exports = routers;
