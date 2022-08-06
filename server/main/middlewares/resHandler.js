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
      message: data.message || 'Request Success',
      status: data.code || 200,
      result: data,
      requestId,
    };
    res.send(finalObj);
    logResponse(requestMethod, originalUrl, data, requestId);
  }

  function fail(data) {
    const finalObj = {
      ok: false,
      message: data.message,
      status: data.code || 500,
      requestId,
      debugInfo: data || {},
    };

    delete finalObj.debugInfo.message;
    res.status(finalObj.status);
    res.send(finalObj);
    logResponse(requestMethod, originalUrl, data, requestId);
  }

  res.ok = ok;
  res.fail = fail;
  next();
}

module.exports = resHandler;
