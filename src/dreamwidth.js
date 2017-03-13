import Methods from './utils/methods';

class Dreamwidth {

  constructor(username, password) {
    this.username = username;
    this.password = Methods.getHash(password);
  }

  /* 
   * General method 
   */
  method(name, params) {
    params.username = this.username;
    params.auth_method = 'challenge';

    return Methods.getChallenge(this.password).then( auth_params => {
        Object.assign(params, auth_params);

        return Methods.methodCall(name, params).then( data => {
          return data;
        }).catch( err => { 
          throw err;
        });
      }).catch( err => { 
        throw err;
      });
  }

}

export function login(username, password) {
  return new Dreamwidth(username, password);
}