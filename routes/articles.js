const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlValidator = require('../custom-validator');
const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

articlesRouter.get('/', getArticles);

articlesRouter.delete('/articleId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), deleteArticle);

articlesRouter.post('/', celebrate({
  body: Joi.object().keys({
    keywords: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((link) => urlValidator(link)),
    image: Joi.string().required().custom((link) => urlValidator(link)),
  }),
}), createArticle);

module.exports = articlesRouter;
