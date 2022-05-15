const Logger = require('lib/basic/Logger');

const ApiServer = require('server/main/apiServer');

const server = new ApiServer(3444);
Logger.debug({ msg: 'Start server', server });
