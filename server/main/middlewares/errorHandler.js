const Logger = require('lib/basic/Logger');

function errorHandler(err, req, res, next) { // eslint-disable-line
  const { requestId } = req;
  const errorMsg = err.message;

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 501);
  Logger.info({ msg: `General error handler: ${errorMsg}`, requestId });
  return res.fail(errorMsg);
}

module.exports = errorHandler;
