'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xmlrpc = require('xmlrpc');

var _xmlrpc2 = _interopRequireDefault(_xmlrpc);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
 * Create secure XMLRPC client
 */
var CLIENT = _xmlrpc2.default.createSecureClient({
  host: 'www.dreamwidth.org',
  path: '/interface/xmlrpc',
  port: 443
});

/* 
 * Make method call
 */
function methodCall(name, params) {
  params.ver = params.ver || 1;

  return new Promise(function (resolve, reject) {
    CLIENT.methodCall('LJ.XMLRPC.' + name, [params], function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

/* 
 * Get challenge auth token
 */
function getChallenge(password) {
  var _this = this;

  return this.methodCall('getchallenge', {}).then(function (data) {
    return {
      auth_challenge: data.challenge,
      auth_response: _this.getHash(data.challenge + password)
    };
  }).catch(function (err) {
    throw err;
  });
}

/* 
 * MD5 hash for passwords
 */
function getHash(plaintext) {
  return _crypto2.default.createHash('md5').update(plaintext).digest('hex');
}

exports.default = { methodCall: methodCall, getChallenge: getChallenge, getHash: getHash };