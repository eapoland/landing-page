#!/usr/bin/env node

const glob = require('glob'),
  fs = require('fs');

const files = glob.sync('*png');

const getLine = file =>
  `<a id="${file}" href="#${file}">${file}</a>:<br/><img src="${file}" />`;

fs.writeFileSync(
  'index.html',
  '<style>img {border: 1px solid black; margin-bottom: 1em;}</style>' +
    files.map(getLine).join('<br>'),
  'utf8'
);
