'use strict';

module.exports = function($server) {
  var prerender = require('prerender-node'),
      url = process.env.PRERENDER_URL.replace(/{port}/g, process.env.PRERENDER_PORT);

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
  prerender.set('prerenderServiceUrl', url);
  prerender.set('protocol', process.env.EXPRESS_URL.indexOf('https://') === 0 ? 'https' : 'http');

  $server.use(prerender);
};
