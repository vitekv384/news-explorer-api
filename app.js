const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routers = require('./routes/index');
const errorHandler = require('./utils/errorHandler');
const limiter = require('./utils/limiter');

require('dotenv').config();

const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/news-api',
} = process.env;
const app = express();

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);
app.use('/', routers);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервис запущен на ${PORT} порту`);
});
