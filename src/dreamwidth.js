import xmlrpc from 'xmlrpc';
import DreamwidthError from './error';
import Hash from './hash';

class Dreamwidth {

  constructor(username, password) {
    this.username = username;
    this.password = new Hash(password).md5;

    this.client = xmlrpc.createSecureClient({
      host: 'www.dreamwidth.org',
      path: '/interface/xmlrpc',
      port: 443
    });

  }

  method(name, params) {
    params.ver = params.ver || 1;

    return new Promise( (resolve, reject) => {
      this.client.methodCall('LJ.XMLRPC.' + name, [params], function(err, data) {
        if (err) {
          let error = new DreamwidthError(err);
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  methodAuth(name, params) {
    params.username = this.username;
    params.auth_method = 'challenge';

    return this.getChallenge().then( auth_params => {
      Object.assign(params, auth_params);
      return this.method(name, params);
    });
  }

  getChallenge() {
    return this.method('getchallenge', {})
      .then( data => { 
        return { 
          auth_challenge: data.challenge,
          auth_response: new Hash(data.challenge + this.password).md5
        } 
      }).catch( err => { console.log(err) } );
  }

}

export default Dreamwidth;
