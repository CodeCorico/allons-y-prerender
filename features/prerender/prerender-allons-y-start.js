'use strict';

var path = require('path');

module.exports = {
  name: 'Allons-y Prerender',
  enabled: !process.env.PRERENDER || process.env.PRERENDER == 'true' || false,
  fork: true,
  forkCount: 1,
  forkMaxRestarts: parseInt(process.env.PRERENDER_RESTARTS || 1, 10),
  module: require(path.resolve(__dirname, 'prerender-server.js'))
};
