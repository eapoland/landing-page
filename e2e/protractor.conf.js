exports.config = {
  directConnect: true,

  jasmineNodeOpts: {
   defaultTimeoutInterval: 60000
  },

  capabilities: {
    browserName: 'chrome',
    specs: ['*.spec.js']
  }
};
