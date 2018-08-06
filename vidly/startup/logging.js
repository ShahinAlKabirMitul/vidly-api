const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
module.exports = function() {
  winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtException.log' })
  );

  process.on('unhandledRejection', ex => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: 'logfile.log' });
  winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' });

  const p = Promise.reject(new Error('Something failed miserable !'));
  p.then(() => console.log('Done'));
};
