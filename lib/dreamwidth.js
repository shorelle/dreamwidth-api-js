"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var xmlrpc = _interopRequire(require("xmlrpc"));

var DreamwidthError = _interopRequire(require("./error"));

var Hash = _interopRequire(require("./hash"));

var Dreamwidth = (function () {
  function Dreamwidth(username, password) {
    _classCallCheck(this, Dreamwidth);

    this.username = username;
    this.password = new Hash(password).md5;

    this.client = xmlrpc.createSecureClient({
      host: "www.dreamwidth.org",
      path: "/interface/xmlrpc",
      port: 443
    });
  }

  _createClass(Dreamwidth, {
    method: {
      value: function method(name, params) {
        var _this = this;

        params.ver = params.ver || 1;

        return new Promise(function (resolve, reject) {
          _this.client.methodCall("LJ.XMLRPC." + name, [params], function (err, data) {
            if (err) {
              var error = new DreamwidthError(err);
              reject(error);
            } else {
              resolve(data);
            }
          });
        });
      }
    },
    methodAuth: {
      value: function methodAuth(name, params) {
        var _this = this;

        params.username = this.username;
        params.auth_method = "challenge";

        return this.getChallenge().then(function (auth_params) {
          Object.assign(params, auth_params);
          return _this.method(name, params);
        });
      }
    },
    getChallenge: {
      value: function getChallenge() {
        var _this = this;

        return this.method("getchallenge", {}).then(function (data) {
          return {
            auth_challenge: data.challenge,
            auth_response: new Hash(data.challenge + _this.password).md5
          };
        })["catch"](function (err) {
          console.log(err);
        });
      }
    }
  });

  return Dreamwidth;
})();

module.exports = Dreamwidth;