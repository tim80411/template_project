const logger = require('lib/basic/Logger');

class BasicLoader {
  constructor(httpServer, uri, opt, dbType) {
    this.httpServer = httpServer;
    this.uri = uri;
    this.opt = opt;
    this.dbType = dbType;
  }

  init(uri = this.uri, opt = this.opt) {
    logger.info({ msg: 'DB connecting...', uri, opt });
  }

  // mongoose default setting
  setDbConfig(opt = this.opt, dbType = this.dbType) {
    logger.info({ msg: `Setting ${dbType} config`, defaultSetting: opt });
  }

  setEventHandler(dbType = this.dbType) {
    logger.info({ msg: `Setting ${dbType} connection events handler` });
  }
}

module.exports = BasicLoader;
