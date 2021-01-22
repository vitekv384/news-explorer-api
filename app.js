const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routers = require('./routes/index');
const errorHandler = require('./utils/errorHandler');
const limiter = require('./utils/limiter');

require('dotenv').config();

const whitelist = [
  'http://localhost:8080',
  'http://news-app.tk',
  'https://news-app.tk',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'authorization',
    'credentials',
  ],
  credentials: true,
};

const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/news-api',
} = process.env;
const app = express();

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

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
