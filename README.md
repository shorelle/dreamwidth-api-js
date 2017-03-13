# dreamwidth-api-js
A simple Javascript client for [Dreamwidth](http://www.dreamwidth.org)'s XML-RPC API. (Still in progress!)
* Uses native Promises (transpiled for ES5)

## Usage
Download the library and include (or use `import Dreamwidth from './lib/dreamwidth'` for ES6)
```javascript
var Dreamwidth = require('./lib/dreamwidth');
```
(To-do: publish on npm)

### Login
Login to your Dreamwidth account (note: you are required to login to access the API)
```javascript
var myDreamwidth = Dreamwidth.login('username', 'password');
```

### Methods
Use the general `.method(value, options)` function to access API methods. See [wiki documentation](http://wiki.dwscoalition.org/wiki/index.php/XML-RPC_Protocol) for a list of available methods and their options, in conjunction with the [original Livejournal docs](http://www.livejournal.com/doc/server/ljp.csp.xml-rpc.protocol.html) (note that both are a bit outdated)

**Example:** use 'getevents' method to get the latest posts from your journal.
```javascript
// Set relevant options for the method
var options = {
    selecttype: 'lastn',
    howmany: 10
}

myDreamwidth.method('getevents', options)
    .then( function(data) {
        // ... Do the things
    }).catch( function(data) {
        // ... Handle errors
    });
```
**Response:**
```javascript
{ events: 
   [ { eventtime: '2017-02-13 16:53:00',
       event: 'The post body content',
       anum: 456,
       itemid: 1,
       logtime: '2017-03-13 05:53:13',
       props: [Object],
       subject: 'The post subject',
       url: 'https://your_name.dreamwidth.org/123.html' },
       // More entries...
    ]
}
```

## To-Do
Unit testing, helper methods, documentation.