const _ = require('lodash');

const logger = require('lib/basic/Logger');

function logResponse(requestMethod, originalUrl, data, requestId) {
  logger.info({
    msg: 'Request Finish:',
    method: _.upperCase(requestMethod),
    endpoint: originalUrl,
    data,
    requestId,
  });
}

function resHandler(req, res, next) {
  const { requestId, method: requestMethod, originalUrl } = req;

  function ok(data) {
    const finalObj = {
      ok: true,
      status: data.status || 200,
      result: data,
      requestId,
    };
    res.send(finalObj);
    logResponse(requestMethod, originalUrl, data, requestId);
  }

  function fail(data) {
    const finalObj = {
      ok: false,
      status: data.status || 500,
      debugInfo: data,
      requestId,
    };
    res.send(finalObj);
    logResponse(requestMethod, originalUrl, data, requestId);
  }

  res.ok = ok;
  res.fail = fail;
  next();
}

module.exports = resHandler;
