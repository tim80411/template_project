const pino = require('pino');

/**
 * pino document: https://github.com/pinojs/pino/blob/HEAD/docs/api.md
 */
const Logger = pino({
  level: 'trace',
  timestamp: pino.stdTimeFunctions.isoTime,
  base: undefined,
});

module.exports = Logger;
