var Dreamwidth = require('../lib/dreamwidth');

// Placeholder username and password
var myDreamwidth = Dreamwidth('username','password');

// Example: get events
var options = {
  selecttype: 'lastn',
  howmany: 2
};

myDreamwidth.method('getevents', options)
  .then(function(data) {
    console.log(data);
  }).catch(function(err) {
    console.log(err);
  });