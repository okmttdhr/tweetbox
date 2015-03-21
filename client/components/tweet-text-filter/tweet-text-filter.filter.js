'use strict';

// Tweet のメンションとハッシュタグをリンクに変換するフィルター。
// リンクに関してはここではなく delete-url-filter で消している。
// 参考：JavaScript parser for Tweet Entities https://gist.github.com/wadey/442463
angular.module('tweetboxApp')
  .filter('tweetTextFilter', function () {
    return function (input, mentions, hashtags) {

      // メンションもハッシュタグもなければそのまま
      if (mentions.length == 0 && hashtags.length == 0) return input;

      // メンション
      if (mentions.length != 0) {
        $.each(mentions, function(i,item) {
          input = input.split("@"+item.screen_name).join("<a target='_blank' href='http://twitter.com/"+item.screen_name+"'>@"+item.screen_name+"</a>");
        });
      }

      // ハッシュタグ
      if (hashtags.length != 0) {
        $.each(hashtags, function(i,item) {
          input = input.split("#"+item.text).join("<a target='_blank' href='http://twitter.com/hashtag/"+item.text+"'>#"+item.text+"</a>");
        });
      }

      return input;
    };
  });
