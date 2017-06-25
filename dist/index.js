'use strict';

var _db = require('./src/lib/db');

var _server = require('./src/server');

var port = process.env.PORT || 5000;

var db = (0, _db.createDb)();

(0, _server.createServer)(db).listen(port, function () {
  // eslint-disable-next-line no-undef
  console.log('Book API listening on port ' + port);
});