'use strict';

angular.module('tweetboxApp')
  .filter('replaceFilter', function () {
    return function (input) {
      return 'replaceFilter filter: ' + input;
    };
  });
