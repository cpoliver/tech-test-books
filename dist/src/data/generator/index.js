'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateBook = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _constants = require('../../constants');

var _authorName = require('./authorName');

var _title = require('./title');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PUBLISHED_FROM = 1942;
var PUBLISHED_UNTIL = 2017;

var random = new _chance2.default();

var pickoneFromObject = function pickoneFromObject(obj) {
  return random.pickone(Object.values(obj));
};
var weightedFromObject = function weightedFromObject(obj, weights) {
  return random.weighted(Object.values(obj), weights);
};

var formatDate = function formatDate(date) {
  return date.toISOString().substring(0, 10);
};
var generateDate = function generateDate() {
  return random.birthday({
    year: random.year({ min: PUBLISHED_FROM, max: PUBLISHED_UNTIL })
  });
};

var generateBook = exports.generateBook = function generateBook() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _overrides$authorGend = overrides.authorGender,
      authorGender = _overrides$authorGend === undefined ? weightedFromObject(_constants.GENDER, [50, 50, 1]) : _overrides$authorGend,
      _overrides$genre = overrides.genre,
      genre = _overrides$genre === undefined ? pickoneFromObject(_constants.GENRE) : _overrides$genre;


  return {
    genre: genre,
    title: (0, _title.generateTitle)(genre),
    author: _extends({
      gender: authorGender
    }, (0, _authorName.generateAuthorName)(authorGender)),
    publishedOn: formatDate(generateDate())
  };
};