const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Ошибка валидации ${err.message}`));
      }
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findOneAndDelete({ _id: req.params.articleId, owner: req.user._id })
    .orFail()
    .then((article) => {
      res.status(200).send({ data: article });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(`Статья с id ${req.params.articleId} не найдена`));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError(`Ошибка валидации id статьи ${req.params.articleId}`));
      }
      return next(err);
    });
};
