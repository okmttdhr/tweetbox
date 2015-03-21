'use strict';

angular.module('tweetboxApp')
  .filter('deleteUrlFilter', function () {
    return function (input) {
      var replacedInput = input.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '');
      return replacedInput;
    };
  });
