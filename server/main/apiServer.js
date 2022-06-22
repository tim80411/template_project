const app = require('server/main/express');
const logger = require('lib/basic/Logger');
const fs = require('fs');

const config = require('config/entry');

function preCheckPathExist(path) {
  logger.info({ msg: 'check path exists', path });
  if (!fs.existsSync(path)) {
    logger.info({ msg: 'try to init path dir' });
    fs.mkdirSync(path, { recursive: true });
  }
}
class ApiServer {
  constructor(port) {
    this.port = port;
    this.httpServer = null;

    this.createServer();
    this.createDBConnection();
  }

  async createServer() {
    this.httpServer = app;
    this.httpServer.listen(this.port, () => {
      logger.info({ msg: `Start listen on port: ${this.port}` });
      preCheckPathExist(config.file.uploadPath);
    });
  }

  async createDBConnection() {
    // db code
    logger.info('create db connection', this.port);
  }
}

module.exports = ApiServer;
