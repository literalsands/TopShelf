var config = require('./environment');
var thinky = require('thinky')({
    host: config.rethinkdb.host,
    port: parseInt(config.rethinkdb.port),
    db:   config.rethinkdb.db
});

module.exports = thinky;
