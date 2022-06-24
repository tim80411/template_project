const MongooseLoader = require('server/main/dbLoader/MongooseLoader');

class DBLoader {
  /**
   * 可兼容不同DB的連線器
   * @param {*} httpServer server
   * @param {('mongodb')} dbType 指定連線的db種類
   * @param {String} uri db uri
   * @param {Object} opt db 設定參數
   */
  constructor(httpServer, dbType, uri, opt) {
    this.db = new DBLoader.dbLoaderImport[`${dbType}`](httpServer, uri, opt);
    this.httpServer = httpServer;
  }

  static get dbLoaderImport() {
    return {
      mongodb: MongooseLoader,
    };
  }
}

module.exports = DBLoader;
