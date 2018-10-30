var screenshotEverything = require('./screenshot-everything.js');

describe('homepage', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
  });

  it('should screenshot everything', function() {
    browser.driver.get('http://localhost:9000/');

    screenshotEverything();
  });
});
