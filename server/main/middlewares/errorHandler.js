const Logger = require('lib/basic/Logger');

function errorHandler(err, req, res) {
  // set locals, only providing error in development
  const { requestId } = req;
  const errorMsg = err.message;

  // render the error page
  res.status(err.status || 501);
  Logger.info({ msg: `General error handler: ${errorMsg}`, requestId });
  return res.send(errorMsg);
}

module.exports = errorHandler;
