/* eslint-env es6 */

const membersPhoto = require('./members-photo'),
  Rx = require('rxjs/Rx'),
  fs = require('fs'),
  shell = require('shelljs'),
  limit = 132 * 2; // img size, times retina pixels

membersPhoto.subscribe(path => {
  shell.exec(
    `convert ${path} -resize ${limit}x${limit} -density 72 -quality 100 ${path}`
  );
});
