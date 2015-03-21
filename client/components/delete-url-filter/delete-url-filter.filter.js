'use strict';

// http、httpsなどで始まる文字列を正規表現で空文字に置換するフィルター
angular.module('tweetboxApp')
  .filter('deleteUrlFilter', function () {
    return function (input) {
      var replacedInput = input.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '');
      return replacedInput;
    };
  });
