import xmlrpc from 'xmlrpc';
import crypto from 'crypto';

/* 
 * Create secure XMLRPC client
 */
const CLIENT = xmlrpc.createSecureClient({
    host: 'www.dreamwidth.org',
    path: '/interface/xmlrpc',
    port: 443
  });

/* 
 * Make method call
 */
function methodCall(name, params) {
  params.ver = params.ver || 1;

  return new Promise( (resolve, reject) => {
    CLIENT.methodCall('LJ.XMLRPC.' + name, [params], (err, data) => {
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
  return this.methodCall('getchallenge', {})
    .then( data => { 
      return { 
        auth_challenge: data.challenge,
        auth_response: this.getHash(data.challenge + password)
      } 
    });
}

/* 
 * MD5 hash for passwords
 */
function getHash(plaintext) {
  return crypto.createHash('md5').update(plaintext).digest('hex');
}

export default { methodCall, getChallenge, getHash }