'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateAuthorName = undefined;

var _firstNames;

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _authorNames = require('./authorNames.json');

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var random = new _chance2.default();

var FEMALE = _constants.GENDER.FEMALE,
    MALE = _constants.GENDER.MALE,
    NON_BINARY = _constants.GENDER.NON_BINARY;


var firstNames = (_firstNames = {}, _defineProperty(_firstNames, FEMALE, _authorNames.femaleNames), _defineProperty(_firstNames, MALE, _authorNames.maleNames), _defineProperty(_firstNames, NON_BINARY, random.pickone([_authorNames.femaleNames, _authorNames.maleNames])), _firstNames);

var generateAuthorName = exports.generateAuthorName = function generateAuthorName(gender) {
  return {
    firstName: random.pickone(firstNames[gender]),
    surname: random.pickone(_authorNames.surnames)
  };
};