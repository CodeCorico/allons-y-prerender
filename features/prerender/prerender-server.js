'use strict';

module.exports = function($allonsy, $done) {

  process.env.PORT = process.env.PRERENDER_PORT;
  process.env.DISABLE_LOGGING = true;

  var path = require('path'),
      prerender = require('prerender'),
      server = prerender({
        port: process.env.PRERENDER_PORT,
        workers: process.env.PRERENDER_COUNT && process.env.PRERENDER_COUNT == 'cpu' ?
          require('os').cpus().length :
          parseInt(process.env.PRERENDER_COUNT || 1, 10),
        logRequests: false,
        pageDoneCheckTimeout: 10000,
        jsCheckTimeout: 10000
      });

  server.use(prerender.sendPrerenderHeader());
  server.use(prerender.blacklist());
  server.use(prerender.removeScriptTags());
  server.use(prerender.httpHeaders());

  // process.env.MONGOLAB_URI = 'mongodb://' + (
  //   process.env.DB_Prerender_USER ? process.env.DB_Prerender_USER + (process.env.DB_Prerender_PASSWORD || '') + '@' : ''
  // ) + process.env.DB_Prerender_HOST + (process.env.DB_Prerender_PORT ? ':' + process.env.DB_Prerender_PORT : '') +
  // (process.env.DB_Prerender_NAME ? '/' + process.env.DB_Prerender_NAME : '');

  // process.env.MONGOLAB_COLLECTION = 'prerender';

  // server.use(require(path.resolve(__dirname, 'prerender-mongo-cache.js')));

  $allonsy.log('allons-y-prerender', 'server:start');

  $allonsy.outputInfo('► PRERENDER SERVER IS RUNNING ON :' + process.env.PRERENDER_PORT);

  server.start();

  $done();
};
