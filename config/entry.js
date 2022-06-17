const dev = require('config/dev');

const configMapping = {
  dev,
};

const presentConfig = configMapping[process.env.NODE_ENV] || dev;

module.exports = presentConfig;
