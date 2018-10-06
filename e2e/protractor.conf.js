var puppeteer = require('puppeteer');

exports.config = {
  directConnect: true,

  jasmineNodeOpts: {
   defaultTimeoutInterval: 150000
  },

  capabilities: {
    browserName: 'chrome',
    specs: ['*.spec.js'],
    chromeOptions: {
      args: ['--headless', '--lang=en-Gb,en'],
      binary: puppeteer.executablePath()
    }
  }
};
