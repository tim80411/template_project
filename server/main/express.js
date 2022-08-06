// express 4 still not support promise: https://stackoverflow.com/questions/51391080/handling-errors-in-express-async-middleware
const express = require('express');
require('express-async-errors');
const cors = require('cors');

// src
const initRoute = require('src/routes/entry');
// middleware
const errorHandler = require('./middlewares/errorHandler');
const resHandler = require('./middlewares/resHandler');
const reqSetup = require('./middlewares/reqSetup');
const multer = require('./middlewares/multer');
const joiErrorHandler = require('./middlewares/joiErrorHandler');

const app = express();

// request printer
app.use(cors());
app.use(reqSetup);
app.use(resHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer);

initRoute(app);
app.use(joiErrorHandler);
app.use(errorHandler);

// final
app.use('*', (req, res) => res.status(404).send({
  ok: false,
  msg: 'route not fount',
  error: {
    code: 404,
    debugInfo: { uri: req.originalUrl },
  },
}));
module.exports = app;
