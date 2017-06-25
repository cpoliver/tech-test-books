'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServer = undefined;

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _generator = require('./data/generator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_ITEMS_PER_PAGE = 10;
var DEFAULT_PAGE = 1;
var DEFAULT_FILTER = JSON.stringify({});
var DEFAULT_SORT = JSON.stringify({ title: 1 });

var parseParams = function parseParams(_ref) {
  var params = _ref.params;
  var _params$itemsPerPage = params.itemsPerPage,
      itemsPerPage = _params$itemsPerPage === undefined ? DEFAULT_ITEMS_PER_PAGE : _params$itemsPerPage,
      _params$page = params.page,
      page = _params$page === undefined ? DEFAULT_PAGE : _params$page,
      _params$filter = params.filter,
      filter = _params$filter === undefined ? DEFAULT_FILTER : _params$filter,
      _params$sort = params.sort,
      sort = _params$sort === undefined ? DEFAULT_SORT : _params$sort;


  return {
    itemsPerPage: parseInt(itemsPerPage, 10),
    page: parseInt(page, 10),
    filter: JSON.parse(filter),
    sort: JSON.parse(sort)
  };
};

var createServer = exports.createServer = function createServer(db) {
  var server = _restify2.default.createServer();

  server.use(_restify2.default.queryParser());
  server.use(_restify2.default.CORS({ origins: ['*'] })); // eslint-disable-line new-cap

  server.get('/books', function (request, response) {
    var _parseParams = parseParams(request),
        itemsPerPage = _parseParams.itemsPerPage,
        page = _parseParams.page,
        filter = _parseParams.filter,
        sort = _parseParams.sort;

    var skip = (page - 1) * itemsPerPage;

    db.find(filter).sort(sort).skip(skip).limit(itemsPerPage).exec(function (error, books) {
      if (error) {
        response.send(500);
      } else {
        response.send(200, books);
      }
    });
  });

  server.get('/books/count', function (request, response) {
    var _request$params$filte = request.params.filter,
        filter = _request$params$filte === undefined ? DEFAULT_FILTER : _request$params$filte;


    db.count(JSON.parse(filter), function (error, count) {
      if (error) {
        response.send(500);
      } else {
        response.send(200, { count: count });
      }
    });
  });

  server.post('/admin/add-books/:count', function (request, response) {
    var count = request.params.count;

    var books = [];

    for (var i = 0; i < count; i++) {
      books.push((0, _generator.generateBook)());
    }

    db.insert(books, function (error, books) {
      if (error) {
        response.send(500);
      } else {
        response.send(200, { message: 'added ' + books.length + ' books' });
      }
    });
  });

  server.del('/admin/delete-all-books', function (request, response) {
    db.remove({}, { multi: true }, function (error, count) {
      if (error) {
        response.send(500);
      } else {
        response.send(200, { message: 'database cleared: deleted ' + count + ' books' });
      }
    });
  });

  return server;
};