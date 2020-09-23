const express = require('express');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервис запущен на ${PORT} порту`);
});
