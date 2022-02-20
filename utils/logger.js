const bunyan = require('bunyan');

const log = bunyan.createLogger({
  name: 'bunyan-log',
});

module.exports = log;
