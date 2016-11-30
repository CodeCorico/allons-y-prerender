'use strict';

module.exports = function($allonsy, $done) {

  process.env.PORT = process.env.PRERENDER_PORT;
  process.env.DISABLE_LOGGING = true;

  var DATABASE_NAMESPACE = 'DB_Prerender_',
      DATABASE_COLLECTION = 'prerender',

      path = require('path'),
      prerender = require('prerender'),

      server = prerender({
        port: process.env.PRERENDER_PORT,
        workers: process.env.PRERENDER_COUNT && process.env.PRERENDER_COUNT == 'cpu' ?
          require('os').cpus().length :
          parseInt(process.env.PRERENDER_COUNT || 1, 10),
        logRequests: false,
        pageDoneCheckTimeout: 30000,
        jsCheckTimeout: 30000
      });

  server.use(prerender.sendPrerenderHeader());
  server.use(prerender.blacklist());
  server.use(prerender.removeScriptTags());
  server.use(prerender.httpHeaders());

  process.env.MONGOLAB_URI = 'mongodb://' + (
    process.env[DATABASE_NAMESPACE + 'USER'] ?
      process.env[DATABASE_NAMESPACE + 'USER'] + (process.env[DATABASE_NAMESPACE + 'PASSWORD'] || '') + '@' :
      ''
  ) + process.env[DATABASE_NAMESPACE + 'HOST'] + (
    process.env[DATABASE_NAMESPACE + 'PORT'] ? ':' + process.env[DATABASE_NAMESPACE + 'PORT'] : ''
  ) +
  (process.env[DATABASE_NAMESPACE + 'NAME'] ? '/' + process.env[DATABASE_NAMESPACE + 'NAME'] : '');

  process.env.MONGOLAB_COLLECTION = DATABASE_COLLECTION;

  server.use(require(path.resolve(__dirname, 'prerender-mongo-cache.js')));

  $allonsy.log('allons-y-prerender', 'server:start');

  $allonsy.outputInfo('► PRERENDER SERVER IS RUNNING ON :' + process.env.PRERENDER_PORT);

  server.start();

  $done();
};
