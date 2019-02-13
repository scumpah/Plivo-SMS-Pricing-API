const winston = require('winston');
const WinstonContext = require('winston-context');


const consoleFormat = winston.format.printf(info => (
  JSON.stringify(info, null, '\n')
));


const logLevel = 'dev';

const isTestEnvironment = false;

function createLogger(env) {
  let logger;
  if (env && !['local'].includes(env)) {
    logger = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.label({ label: 'dev' }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({ silent: isTestEnvironment }),
      ],
    });
  } else {
    logger = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.label({ label: config.get('logPrefix') }),
        consoleFormat,
      ),
      transports: [
        new winston.transports.Console({ silent: isTestEnvironment }),
      ],
    });
  }
  return logger;
}

const logger = createLogger('dev');

const contextLogger = new WinstonContext(logger, '', {
  requestId: (Math.random() * 1e20).toString(36),
});

module.exports = contextLogger;
