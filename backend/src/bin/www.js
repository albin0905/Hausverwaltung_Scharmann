#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv').config();
const app = require('../../app');  // Passe ggf. diesen Pfad an!
const debug = require('debug')('backend:server');
const http = require('http');
const mongoose = require('mongoose');

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

/**
 * Get port from environment (.env) or default.
 */
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

/**
 * Connect to MongoDB
 */
const initMongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB erfolgreich verbunden.');
  } catch (err) {
    console.error('❌ Fehler beim Verbinden mit MongoDB:', err);
    process.exit(1);
  }
};

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Start server after connecting to MongoDB.
 */
initMongoConnect().then(() => {
  server.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server läuft auf Port ${port}`);
  });
  server.on('error', onError);
  server.on('listening', onListening);
});

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
