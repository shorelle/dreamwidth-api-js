/*
 * Global test setup
 */

global.nock = require('nock');

global.chai = require('chai');
global.chai.use(require('chai-as-promised'));
global.expect = global.chai.expect;

global.swapi = require('../lib/dreamwidth');

var record = require('./utils/record');
var recorder = record();

describe('call method', function() {

  before( function() {
    recorder.before();
  });

  after( function() {
    recorder.after();
    nock.cleanAll();
  });



});