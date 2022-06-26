const mongoose = require('mongoose');

const logger = require('lib/basic/Logger');
const BasicLoader = require('./BasicLoader');

class MongooseLoader extends BasicLoader {
  constructor(httpServer, uri, opt) {
    const dbType = 'mongodb';
    super(httpServer, uri, opt, dbType);

    this.setDbConfig();
    this.setEventHandler();
    this.init();
  }

  init() {
    super.init();
    mongoose.connect(this.uri, this.opt);
  }

  // mongoose default setting
  setDbConfig() {
    super.setDbConfig();
    mongoose.set('bufferCommands', false);
  }

  setEventHandler() {
    super.setEventHandler();
    const { connection } = mongoose;
    connection.on('connect', () => logger.info('mongoose event: connect'));
    connection.once('connected', () => {
      logger.info('mongoose event: connected');
      if (this.httpServer) this.httpServer.emit('dbReady', this.dbType);
    });
    connection.on('disconnected', () => logger.info('mongoose event: disconnected'));
    connection.on('reconnected', () => logger.info('mongoose event: reconnected'));
    connection.on('error', (err) => logger.info('mongoose event: error', err));
    connection.on('fullsetup', () => logger.info('mongoose event: fullsetup, connect to replica set primary and at least one secondary'));
  }
}

module.exports = MongooseLoader;
