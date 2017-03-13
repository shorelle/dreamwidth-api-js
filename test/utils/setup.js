/*
 * Nock setup
 */

var nock = require('nock');
var xml = require('xmlrpc/lib/serializer');
var HOST = 'https://www.dreamwidth.org';

// Get challenge response
var params = [{ ver: 1 }];
nock(HOST)
  .persist()
  .post('/interface/xmlrpc', 
    xml.serializeMethodCall('LJ.XMLRPC.getchallenge', params))
  .reply(200, xml.serializeMethodResponse({
      challenge: 'challenge_cookie'
  }));

// Get events response
var auth_params = 
  [{ selecttype: 'lastn',
     username: 'user',
     auth_method: 'challenge',
     auth_challenge: 'challenge_cookie',
     auth_response: '140546b44e8d3c410b598764ef33b251',
     ver: 1 }];
nock(HOST)
  .persist()
  .post('/interface/xmlrpc', 
    xml.serializeMethodCall('LJ.XMLRPC.getevents', auth_params))
  .reply(200, 
    xml.serializeMethodResponse({ 
      events: 
        [ { eventtime: '2017-02-13 16:53:00',
           event: 'The post body content',
           anum: 456,
           itemid: 1,
           logtime: '2017-03-13 05:53:13',
           props: [Object],
           subject: 'The post subject',
           url: 'https://user.dreamwidth.org/123.html' }
        ]
  }));