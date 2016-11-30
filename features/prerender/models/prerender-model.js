module.exports = function() {
  'use strict';

  DependencyInjection.model('PrerenderModel', function($allonsy, $AbstractModel) {

    return $AbstractModel('PrerenderModel', function() {

      return {
        identity: 'prerender',
        connection: 'Prerender',
        migrate: 'safe',
        autoCreatedAt: false,
        autoUpdatedAt: false,
        attributes: {
          key: {
            type: 'string',
            index: true
          },
          value: 'string',
          created: 'date'
        }
      };

    });

  });

  return 'PrerenderModel';
};
