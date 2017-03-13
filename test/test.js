/*
 * Global test setup
 */

var nock = require('nock');

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

var Dreamwidth = require('../lib/dreamwidth');

describe('Dreamwidth', function() {
  // Create Dreamwidth login
  var dw = Dreamwidth.login('user','password');
  var hashedPassword = '5f4dcc3b5aa765d61d8327deb882cf99';

  before( function() {
    // Set up nock requests
    require('./utils/setup');
  });

  after( function() {
    nock.cleanAll();
  });

  describe('constructor', function() {
    it('should return an object with username and password properties', function() {
      expect(dw).to.be.an('object');
      expect(dw).to.have.property('username');
      expect(dw).to.have.property('password');
    });

    it('should have login username set', function() {
      expect(dw).to.have.property('username', 'user');
    });

    it('should have login password hashed and set', function() {
      expect(dw).to.have.property('password', hashedPassword);
    });
  });

  describe('method to get latest posts', function() {
    var options = { 
      selecttype: 'lastn'
    };

    it('should return an object with events property', function() {
      expect(dw.method('getevents', options))
        .to.eventually.be.an('object')
        .and.have.property('events');
    });

    it('should return an array of (1) event objects', function() {
      expect(dw.method('getevents', options))
        .to.eventually.have.deep.property('events[0]')
        .with.keys('eventtime','event','anum','itemid','logtime','props','subject','url');
    });
  });

});