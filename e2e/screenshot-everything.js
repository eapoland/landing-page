var fs = require('fs'),
  url = require('url');

var DIR = 'e2e-screenshots/';

function setViewportSize(size) {
  var JS_GET_PADDING =
    'return {' +
    'w: window.outerWidth - window.innerWidth,' +
    'h: window.outerHeight - window.innerHeight };';

  browser.executeScript(JS_GET_PADDING).then(function(pad) {
    browser
      .manage()
      .window()
      .setSize(size.width + pad.w, size.height + pad.h);
  });

  // Set the position to hash
  browser.driver.navigate().refresh();
}

var sizes = [
  //based on visits from 1 Aug 2017-30 Oct 2018
  // 286
  { width: 1680, height: 1050 },
  // 158
  { width: 1366, height: 768 },
  // 122
  { width: 360, height: 640 },
  // 76
  { width: 1920, height: 1080 },
  // 43
  { width: 1440, height: 900 },
  // 42
  { width: 1536, height: 864 },
  // 35
  { width: 1024, height: 768 },
  // 20 - 29
  { width: 1280, height: 720 },
  // 25
  { width: 375, height: 667 }
];

function saveScreenshot(note, size) {
  var screenShotPromise = browser.takeScreenshot(),
    windowSize = browser.driver
      .manage()
      .window()
      .getSize();

  screenShotPromise.then(function(data) {
    var fileName = '';

    if (note) {
      fileName += note + '-';
    }

    // make sure we don't create subfolders
    fileName = fileName.replace(/\//g, '_');

    var stream = fs.createWriteStream(
      DIR + fileName + size.width + 'x' + size.height + '.png'
    );
    stream.write(new Buffer(data, 'base64'));
    stream.end();
  });

  return screenShotPromise;
}

module.exports = function(positions) {
  sizes.forEach(function(size) {
    positions.forEach(function(position) {
      browser.driver.get(position.url);

      setViewportSize(size);

      saveScreenshot(position.note, size);
    });
  });
};
