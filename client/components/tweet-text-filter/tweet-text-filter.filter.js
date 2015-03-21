'use strict';

angular.module('tweetboxApp')
  .filter('tweetTextFilter', function () {
    return function (input, mentions, hashtags) {
      $.each(mentions, function(i, item) {
        console.log(item)
        input.split('@'+item.screen_name).join('<a href="http://twitter.com/'+item.screen_name+'" target="_blank">@'+item.screen_name+'</a>');
      })
      return input;
    };
  });
