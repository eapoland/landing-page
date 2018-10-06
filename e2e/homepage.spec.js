var screenshotEverything = require('./screenshot-everything.js'),
  homepage = require('./homepage.js');

describe('homepage', function() {
  beforeEach(function() {
    browser.ignoreSynchronization = true;
  });

  it('should screenshot everything', function() {
    screenshotEverything([ {
      note: 'top',
      url: 'http://localhost:9000/'
    }, {
      note: 'second',
      url: 'http://localhost:9000/#image-second'
    }, {
      note: 'third',
      url: 'http://localhost:9000/#image-third'
    }]);
  });
});
