const _ = require('lodash');

const Logger = require('lib/basic/Logger');

function logResponse(requestMethod, originalUrl, data, requestId) {
  Logger.info({
    msg: `Request Finish: {${_.upperCase(requestMethod)}} ${originalUrl} response =`, data, requestId,
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
      status: data.status || 200,
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
