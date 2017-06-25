'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTitle = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _toTitleCase = require('to-title-case');

var _toTitleCase2 = _interopRequireDefault(_toTitleCase);

var _titleParts = require('./titleParts.json');

var _titleParts2 = _interopRequireDefault(_titleParts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var random = new _chance2.default();

var generateTitle = exports.generateTitle = function generateTitle(genre) {
  var _titleParts$genre = _slicedToArray(_titleParts2.default[genre], 7),
      part1 = _titleParts$genre[0],
      part2 = _titleParts$genre[1],
      part3 = _titleParts$genre[2],
      part4 = _titleParts$genre[3],
      part5 = _titleParts$genre[4],
      part6 = _titleParts$genre[5],
      part7 = _titleParts$genre[6];

  var titles = [random.pickone(part1) + ' ' + random.pickone(part4), random.pickone(part2) + ' ' + random.pickone(part4), random.pickone(part2) + ' and ' + random.pickone(part2), random.pickone(part3) + ' ' + random.pickone(part7), random.pickone(part5) + ' ' + random.pickone(part6)];

  return (0, _toTitleCase2.default)(random.pickone(titles));
};