'use strict';

// Tweet のメンションとハッシュタグをリンクに変換するフィルター。
// リンクに関してはここではなく delete-url-filter で消している。
// 参考：JavaScript parser for Tweet Entities https://gist.github.com/wadey/442463
angular.module('tweetboxApp')
  .filter('tweetTextFilter', function () {
    return function (input, mentions, hashtags) {
      var replacedInput;
      var result = "";
      var index = {};

      console.log(mentions.length);
      console.log(hashtags.length);

      // メンションもハッシュタグもなければそのまま
      if (mentions.length == 0 && hashtags.length == 0) return input;
      // if (mentions.length == 0 && hashtags.length == 0) return deleteUrl(input);

      // メンションやハッシュタグとは別の方法でフィルター。
      // deleteUrlFilterがinjectできなかったため関数にした。
      // 理由：
        // URLはテキストから削除したい。
        // 最後に削除しないとentities に元々はいっている indicesが狂ってしまうため。
      function deleteUrl(val) {
        var replacedVal = val.replace(/((http|https|ftp|):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '');
        return replacedVal;
      }

      // エスケープ
      function escapeHTML(text) {
        return $('<div/>').text(text).html();
      }

      // メンション
      if (mentions.length != 0) {
        $.each(mentions, function(i,item) {
          index[item.indices[0]] = [item.indices[1], function(text) {return "<a target='_blank' href='http://twitter.com/"+escapeHTML(item.screen_name)+"'>"+escapeHTML(text)+"</a>"}];
        });
      }

      // ハッシュタグ
      if (hashtags.length != 0) {
        $.each(hashtags, function(i,item) {
          index[item.indices[0]] = [item.indices[1], function(text) {return "<a target='_blank' href='http://twitter.com/hashtag/"+escapeHTML(item.text)+"'>"+escapeHTML(text)+"</a>"}];
        });
      }

      var last_i = 0
      var i = 0

      for (i=0; i < input.length; ++i) {
        var ind = index[i];
        if (ind) {
          var end = ind[0];
          var func = ind[1];
          if (i > last_i) {
            result += escapeHTML(input.substring(last_i, i));
          }
          result += func(input.substring(i, end));
          i = end - 1;
          last_i = end;
        }
      }

      if (i > last_i) {
        result += escapeHTML(input.substring(last_i, i));
      }

      // return deleteUrl(result);
      console.log(result);
      return result;
    };
  });
