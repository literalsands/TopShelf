/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var fs = require('fs');
var https = require('https');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);


var pkey = fs.readFileSync('./server/config/keys/key.pem');
var pcert = fs.readFileSync('./server/config/keys/cert.pem');
var credentials = {key: pkey, cert: pcert};

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});

require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);


var httpsServer = https.createServer(credentials, app);
// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

httpsServer.listen(8443);
// Expose app
exports = module.exports = app;
