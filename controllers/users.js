/* eslint-disable consistent-return */
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(`${err.message}`));
      }
    });
};
