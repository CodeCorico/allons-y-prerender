'use strict';

module.exports = function($server, $WebService) {
  if (process.env.PRERENDER && process.env.PRERENDER == 'false') {
    return;
  }

  var prerender = require('prerender-node'),
      request = require('request'),
      prerenderUrl = process.env.PRERENDER_URL.replace(/{port}/g, process.env.PRERENDER_PORT);

  $WebService.onSafe('prerender.updateUrl', function(args) {
    process.nextTick(function() {
      args.url = args.url.lastIndexOf('/') === args.url.length - 1 ? args.url.substr(0, args.url.length - 1) : args.url;

      var PrerenderModel = DependencyInjection.injector.controller.get('PrerenderModel'),
          url = process.env.EXPRESS_URL + (!args.url ? '' : (args.url.indexOf('/') === 0 ? '' : '/') + args.url);

      PrerenderModel
        .destroy({
          key: '/' + url
        })
        .exec(function() {
          request(prerenderUrl + '/' + url);
        });
    });
  });

  prerender.set('crawlerUserAgents', [
    'googlebot',
    'yahoo',
    'bingbot',
    'baiduspider',
    'facebookexternalhit',
    'twitterbot',
    'rogerbot',
    'linkedinbot',
    'embedly',
    'quora link preview',
    'showyoubot',
    'outbrain',
    'pinterest/0.',
    'developers.google.com/+/web/snippet',
    'slackbot',
    'vkShare',
    'W3C_Validator',
    'redditbot',
    'Applebot',
    'WhatsApp',
    'flipboard',
    'tumblr',
    'bitlybot',
    'SkypeUriPreview',
    'nuzzel',
    'Discordbot'
  ]);
  prerender.set('prerenderServiceUrl', prerenderUrl);
  prerender.set('protocol', process.env.EXPRESS_URL.indexOf('https://') === 0 ? 'https' : 'http');

  $server.use(prerender);
};
