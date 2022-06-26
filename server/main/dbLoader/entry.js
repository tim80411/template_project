const MongooseLoader = require('server/main/dbLoader/MongooseLoader');
const BasicLoader = require('./BasicLoader');

class DBLoaderFactory {
  /**
   * 可產出不同db連線的db工廠
   * @param {Object} httpServer server
   * @param {('mongodb')} dbType 指定連線的db種類
   * @param {String} uri db uri
   * @param {Object} opt db 設定參數
   */
  constructor(httpServer, dbType, uri, opt) {
    this.httpServer = httpServer;

    const SelectDBLoader = DBLoaderFactory.registeredType.get(dbType);
    if (!SelectDBLoader) throw new Error('無法取得dbLoader');

    this.db = new SelectDBLoader(httpServer, uri, opt);
  }

  // 預設mongodb
  static registeredType = new Map([['mongodb', MongooseLoader]]);

  /**
   * 註冊可用的連線器
   * @param {String} dbType dbLoader名稱
   * @param {typeof BasicLoader} dbLoader 連線器; 須為BasicLoader的擴充
   */
  static register(dbType, dbLoader) {
    if (!(dbLoader instanceof BasicLoader)) throw new Error('註冊了不屬於BasicLoader的類別');

    DBLoaderFactory.registeredType.set(dbType, dbLoader);
  }

  static removal(dbType) {
    DBLoaderFactory.registeredType.delete(dbType);
  }
}

module.exports = DBLoaderFactory;
