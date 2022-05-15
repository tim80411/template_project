const express = require('express');
const cors = require('cors');

// middleware
const errorHandler = require('./middlewares/errorHandler');
const resHandler = require('./middlewares/resHandler');
const reqSetup = require('./middlewares/reqSetup');

const app = express();

// request printer
app.use(reqSetup);
app.use(cors());
app.use(resHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// TODO: app.use(router)
// TODO: app.use(joiErrorHandler)
app.use(errorHandler);

module.exports = app;
