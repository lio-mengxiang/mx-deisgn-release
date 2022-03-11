const path = require('path');

module.exports = {
  entries: {
    index: {
      entry: ['./release.ts'],
      template: './web/index.html',
      favicon: './favicon.ico',
    },
  },
};
