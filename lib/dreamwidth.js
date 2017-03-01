'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xmlrpc = require('xmlrpc');

var _xmlrpc2 = _interopRequireDefault(_xmlrpc);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _hash = require('./hash');

var _hash2 = _interopRequireDefault(_hash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dreamwidth = function () {
  function Dreamwidth(username, password) {
    _classCallCheck(this, Dreamwidth);

    this.username = username;
    this.password = new _hash2.default(password).md5;

    this.client = _xmlrpc2.default.createSecureClient({
      host: 'www.dreamwidth.org',
      path: '/interface/xmlrpc',
      port: 443
    });
  }

  _createClass(Dreamwidth, [{
    key: 'method',
    value: function method(name, params) {
      var _this = this;

      params.ver = params.ver || 1;

      return new Promise(function (resolve, reject) {
        _this.client.methodCall('LJ.XMLRPC.' + name, [params], function (err, data) {
          if (err) {
            var error = new _error2.default(err);
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
    }
  }, {
    key: 'methodAuth',
    value: function methodAuth(name, params) {
      var _this2 = this;

      params.username = this.username;
      params.auth_method = 'challenge';

      return this.getChallenge().then(function (auth_params) {
        Object.assign(params, auth_params);
        return _this2.method(name, params);
      });
    }
  }, {
    key: 'getChallenge',
    value: function getChallenge() {
      var _this3 = this;

      return this.method('getchallenge', {}).then(function (data) {
        return {
          auth_challenge: data.challenge,
          auth_response: new _hash2.default(data.challenge + _this3.password).md5
        };
      }).catch(function (err) {
        console.log(err);
      });
    }
  }]);

  return Dreamwidth;
}();

exports.default = Dreamwidth;