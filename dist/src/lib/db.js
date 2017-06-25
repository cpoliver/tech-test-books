'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDb = undefined;

var _nedb = require('nedb');

var _nedb2 = _interopRequireDefault(_nedb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_FILE_NAME = './app/src/data/nedb.json';

var createDb = exports.createDb = function createDb() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$inMemoryOnly = _ref.inMemoryOnly,
      inMemoryOnly = _ref$inMemoryOnly === undefined ? false : _ref$inMemoryOnly;

  return new _nedb2.default({
    inMemoryOnly: inMemoryOnly,
    filename: DEFAULT_FILE_NAME,
    autoload: true
  });
};