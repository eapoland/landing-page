/* eslint-env es6 */

const photoFolder = './src/images/members/',
  { promisify } = require('util'),
  fs = require('fs'),
  Rx = require('rxjs/Rx'),
  readDir = promisify(fs.readdir),
  sizeOf = promisify(require('image-size')),
  limit = 132 * 2; // img size, times retina pixels

const filesArray$ = Rx.Observable.from(readDir(photoFolder)),
  files$ = filesArray$.flatMap(array => Rx.Observable.from(array)),
  paths$ = files$.map(fileName => photoFolder + fileName),
  imageInfo$ = paths$.mergeMap(
    path => sizeOf(path),
    (path, fileInfo) => {
      fileInfo.path = path;
      return fileInfo;
    }
  ),
  overSized$ = imageInfo$.filter(
    imageInfo => imageInfo.height > limit || imageInfo.width > limit
  ),
  overSizedPaths$ = overSized$.map(imageInfo => imageInfo.path);

overSizedPaths$.subscribe(path => console.log(path));

module.exports = overSizedPaths$;
