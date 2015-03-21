'use strict';

// Tweet のメンションとハッシュタグをリンクに変換するフィルター。
// リンクに関してはここではなく delete-url-filter で消している。
// 参考：JavaScript parser for Tweet Entities https://gist.github.com/wadey/442463
angular.module('tweetboxApp')
  .filter('tweetTextFilter', function () {
    return function (input, mentions, hashtags) {
      var replacedInput;
      var result = "";
      var index_map = {}

      function escapeHTML(text) {
        return $('<div/>').text(text).html()
      }

      // ハッシュタグ
      $.each(hashtags, function(i,item) {
        index_map[item.indices[0]] = [item.indices[1], function(text) {return "<a target='_blank' href='http://twitter.com/hashtag/"+escapeHTML(item.text)+"'>"+escapeHTML(text)+"</a>"}]
      })

      // メンション
      $.each(mentions, function(i,item) {
        index_map[item.indices[0]] = [item.indices[1], function(text) {return "<a target='_blank' href='http://twitter.com/"+escapeHTML(item.screen_name)+"'>"+escapeHTML(text)+"</a>"}]
      })

      var last_i = 0
      var i = 0

      for (i=0; i < input.length; ++i) {
        var ind = index_map[i]
        if (ind) {
          var end = ind[0]
          var func = ind[1]
          if (i > last_i) result += escapeHTML(input.substring(last_i, i))
          result += func(input.substring(i, end))
          i = end - 1
          last_i = end
        }
      }

      if (i > last_i) {
        result += escapeHTML(input.substring(last_i, i))
      }

      console.log(result)

      return result;
    };
  });
