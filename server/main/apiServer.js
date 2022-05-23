const app = require('server/main/express');
const Logger = require('lib/basic/Logger');

class ApiServer {
  constructor(port) {
    this.port = port;
    this.httpServer = null;

    this.createServer();
    this.createDBConnection();
  }

  async createServer() {
    this.httpServer = app;
    this.httpServer.listen(this.port, () => Logger.info({ msg: `Start listen on port: ${this.port}` }));
  }

  async createDBConnection() {
    // db code
    Logger.info('create db connection', this.port);
  }
}

module.exports = ApiServer;
