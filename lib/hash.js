"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var crypto = _interopRequire(require("crypto"));

var Hash = function Hash(plaintext) {
	_classCallCheck(this, Hash);

	this.md5 = crypto.createHash("md5").update(plaintext).digest("hex");
};

module.exports = Hash;