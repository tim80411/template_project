const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

const logger = require('lib/basic/Logger');

function reqSetup(req, res, next) {
  req.requestId = uuidv4();
  const {
    body, params, query, method, originalUrl, requestId, ip,
  } = req;

  const info = _.omitBy({
    msg: 'Request Start:',
    method: _.upperCase(method),
    endpoint: originalUrl,
    requestIp: ip,
    body,
    params,
    query,
    requestId,
  }, _.isEmpty);

  logger.info(info);

  next();
}

module.exports = reqSetup;
