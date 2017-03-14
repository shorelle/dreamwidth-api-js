'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.login = login;

var _methods = require('./utils/methods');

var _methods2 = _interopRequireDefault(_methods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dreamwidth = function () {
  function Dreamwidth(username, password) {
    (0, _classCallCheck3.default)(this, Dreamwidth);

    this.username = username;
    this.password = _methods2.default.getHash(password);
  }

  /* 
   * General method 
   */


  (0, _createClass3.default)(Dreamwidth, [{
    key: 'method',
    value: function method(name, params) {
      params.username = this.username;
      params.auth_method = 'challenge';

      return _methods2.default.getChallenge(this.password).then(function (auth_params) {
        (0, _assign2.default)(params, auth_params);

        return _methods2.default.methodCall(name, params).then(function (data) {
          return data;
        }).catch(function (err) {
          throw err;
        });
      }).catch(function (err) {
        throw err;
      });
    }
  }]);
  return Dreamwidth;
}();

function login(username, password) {
  return new Dreamwidth(username, password);
}