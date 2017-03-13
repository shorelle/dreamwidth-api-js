'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.login = login;

var _methods = require('./utils/methods');

var _methods2 = _interopRequireDefault(_methods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dreamwidth = function () {
  function Dreamwidth(username, password) {
    _classCallCheck(this, Dreamwidth);

    this.username = username;
    this.password = _methods2.default.getHash(password);
  }

  /* 
   * General method 
   */


  _createClass(Dreamwidth, [{
    key: 'method',
    value: function method(name, params) {
      params.username = this.username;
      params.auth_method = 'challenge';

      return _methods2.default.getChallenge(this.password).then(function (auth_params) {
        Object.assign(params, auth_params);

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