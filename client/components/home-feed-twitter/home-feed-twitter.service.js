'use strict';

angular.module('tweetboxApp')
  .factory('homeFeedTwitter', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
