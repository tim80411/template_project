const mongoose = require('mongoose');

const logger = require('lib/basic/Logger');

class MongooseLoader {
  constructor(httpServer, uri, opt) {
    this.httpServer = httpServer;
    this.uri = uri;
    this.opt = opt;
    this.dbType = 'mongodb';

    MongooseLoader.setMongoose();
    this.setEventHandler();
    this.init();
  }

  init() {
    logger.info({ msg: 'mongo db connect by mongoose', uri: this.uri });
    mongoose.connect(this.uri, this.opt);
  }

  // mongoose default setting
  static setMongoose() {
    mongoose.set('bufferCommands', false);
  }

  setEventHandler() {
    logger.info('Setting connection events handler');

    const { connection } = mongoose;
    connection.on('connect', () => logger.info('mongoose event: connect'));
    connection.on('connected', () => {
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
