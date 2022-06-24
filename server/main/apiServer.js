const fs = require('fs');
const _ = require('lodash');

const config = require('config/entry');
const logger = require('lib/basic/Logger');
const DBLoader = require('server/main/dbLoader/entry');
const app = require('server/main/express');

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
    this.dbs = [];

    this.createServer();
    this.createDBConnection();
    this.setEventHandler();
  }

  createServer() {
    this.httpServer = app;
  }

  createDBConnection() {
    const mongoUri = config.db.mongodb.uri;
    const mongoDbLoader = new DBLoader(this.httpServer, 'mongodb', mongoUri, {});
    this.dbs.push(mongoDbLoader);
  }

  setEventHandler() {
    logger.info('Set server event handler');
    this.httpServer.on('dbReady', (dbType) => {
      logger.info({ msg: `${_.upperFirst(dbType)} database is ready, server is trying to listen on port:${this.port}` });
      this.httpServer.listen(this.port);
    });
    this.httpServer.on('listening', () => {
      logger.info({ msg: `Start listen on port: ${this.port}` });
      preCheckPathExist(config.file.uploadPath);
    });
    this.httpServer.on('error', (err) => {
      logger.error({ msg: 'Express app error:', err });
    });
  }
}

module.exports = ApiServer;
