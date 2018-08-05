const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

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

//throw new Error('Something failed during startup');

console.log(config);
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR : jwtPrivateKey is not define');
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
