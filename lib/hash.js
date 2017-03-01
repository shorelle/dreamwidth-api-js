'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hash = function Hash(plaintext) {
	_classCallCheck(this, Hash);

	this.md5 = _crypto2.default.createHash('md5').update(plaintext).digest('hex');
};

exports.default = Hash;