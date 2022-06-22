const logger = require('lib/basic/Logger');

function errorHandler(err, req, res, next) { // eslint-disable-line
  const { requestId } = req;
  const errorMsg = err.message;

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 501);
  logger.info({ msg: `General error handler: ${errorMsg}`, err, requestId });
  return res.fail(errorMsg);
}

module.exports = errorHandler;
