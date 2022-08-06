const logger = require('lib/basic/Logger');

function errorHandler(err, req, res, next) { // eslint-disable-line
  const { requestId } = req;
  const errorMsg = err.message;

  if (res.headersSent) {
    return next(err);
  }

  logger.info({ msg: `General error handler: ${errorMsg}`, err, requestId });
  return res.fail(err || errorMsg);
}

module.exports = errorHandler;
