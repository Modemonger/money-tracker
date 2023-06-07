'use strict'
const express = require('express');
const httpErrors = require('http-errors');
const pino = require('pino');
const pinoHttp = require('pino-http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

module.exports = function main (options, cb) {
  // Set default options
  const ready = cb || function () {};
  const opts = Object.assign({
    host: 'localhost',
    port: 2000,
  }, options);

  const logger = pino();

  // Server state
  let server;
  let serverStarted = false;
  let serverClosing = false;

  // Setup error handling
  function unhandledError (err) {
    // Log the errors
    logger.error(err);

    // Only clean up once
    if (serverClosing) {
      return;
    }
    serverClosing = true;

    // If server has started, close it down
    if (serverStarted) {
      server.close(function () {
        process.exit(1);
      });
    }
  };
  process.on('uncaughtException', unhandledError);
  process.on('unhandledRejection', unhandledError);

  // Create the express app
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false}));
  app.use(cors());


  // Common middleware
  // app.use(/* ... */)
  app.use(pinoHttp({ logger }));
      
  // Register routes
  app.use('/api/user', require('./routes/userRoutes'));
  app.use('/api/note', require('./routes/noteRoutes'));

  // Common error handlers
  app.use(function fourOhFourHandler (req, res, next) {
    next(httpErrors(404, `Route not found: ${req.url}`));
  });
  app.use(errorHandler);

  // Start server
  server = app.listen(opts.port, opts.host, async function (err) {
    if (err) {
      return ready(err, app, server);
    }

    // If some other error means we should close
    if (serverClosing) {
      return ready(new Error('Server was closed before it could start'));
    }

    serverStarted = true;
    try {
        console.log(process.env.DB_KEY);
        const conn = await mongoose.connect(process.env.DB_KEY);
        console.log(`Connceted to MongoDB ${conn.connection.host}`);
    } catch (err) {
        console.log(`Could not connect to MongoDB `, err);
    }
    const addr = server.address();
    console.log(`Started at ${opts.host || addr.host || 'localhost'}:${addr.port}`);
    ready(err, app, server);
  });
}

