const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

const Logger = require('lib/basic/Logger');

function reqSetup(req, res, next) {
  req.requestId = uuidv4();
  const {
    body, params, query, method, originalUrl, requestId,
  } = req;

  const info = _.omitBy({
    msg: `Request Start: {${_.upperCase(method)}} ${originalUrl} request =`,
    body,
    params,
    query,
    requestId,
  }, _.isEmpty);

  Logger.info(info);

  next();
}

module.exports = reqSetup;
