var Dreamwidth = require('../lib/dreamwidth');

// Placeholder username and password
var myDreamwidth = new Dreamwidth('username','password');

// Example: get events
var options = {
  selecttype: 'lastn',
  howmany: 2
};

myDreamwidth.methodAuth('getevents', options)
  .then(function(data) {
    console.log(data);
  }).catch(function(err) {
    console.log(err);
  });