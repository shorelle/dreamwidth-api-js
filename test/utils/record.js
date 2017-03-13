/*
 * Helper function to save and load Nock records
 */

var fs = require('fs');

module.exports = function() {

  var FIXTURE_FILE = 'test/utils/fixtures.js';
  
  // `has_fixtures` indicates whether the test has fixtures we should read,
  // or doesn't, so we should record and save them.
  // the environment variable `NOCK_RECORD` can be used to force a new recording.
  var has_fixtures = !!process.env.NOCK_RECORD;

  return {
    // starts recording, or ensure the fixtures exist
    before: function() {
      if (!has_fixtures) try {
        require(FIXTURE_FILE);
        has_fixtures = true;
      } catch (e) {
        nock.recorder.rec({
          dont_print: true
        });
      } else {
        has_fixtures = false;
        nock.recorder.rec({
          dont_print: true
        });
      }
    },
    // saves our recording if fixtures didn't already exist
    after: function(done) {
      if (!has_fixtures) {
        var fixtures = nock.recorder.play();
        var text = fixtures.join('\n');
        fs.writeFileSync(FIXTURE_FILE, text);
      } else {
        done();
      }
    }
  }
};