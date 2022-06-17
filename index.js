const logger = require('lib/basic/Logger');

const ApiServer = require('server/main/apiServer');

const port = process.env.PORT || 3444;
const server = new ApiServer(port);
logger.debug({ msg: 'Start server', server });
