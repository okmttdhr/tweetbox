'use strict';

angular.module('tweetboxApp')
  .factory('homeFeedTwitter', function ($resource) {
    return $resource('/api/homeFeedTwitters/:id/:controller', {
      id: '@_id'
    },
    {
      index: {
        method: 'GET',
        params: {
          token:'@token',
          tokenSecret:'@tokenSecret'
        }
      },
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
