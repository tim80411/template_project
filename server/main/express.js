const express = require('express');
const cors = require('cors');

// src
const router = require('src/routes/entry');
// middleware
const errorHandler = require('./middlewares/errorHandler');
const resHandler = require('./middlewares/resHandler');
const reqSetup = require('./middlewares/reqSetup');
const multer = require('./middlewares/multer');

const app = express();

// request printer
app.use(cors());
app.use(reqSetup);
app.use(resHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer);
app.use(router);
// TODO: app.use(joiErrorHandler)
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
