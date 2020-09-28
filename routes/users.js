const routers = require('express').Router();
const { getUser } = require('../controllers/users');

routers.get('/me', getUser);

module.exports = routers;
