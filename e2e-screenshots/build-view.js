#!/usr/bin/env node

const glob = require('glob'),
  fs = require('fs');

const files = glob.sync('*png');

fs.writeFileSync(
  'index.html',
  '<style>img {border: 1px solid black; margin-bottom: 1em;}</style>' +
    files.map(file => `${file}:<br/><img src="${file}" />`).join('<br>'),
  'utf8',
);
