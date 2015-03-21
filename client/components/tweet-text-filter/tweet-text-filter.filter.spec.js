'use strict';

describe('Filter: tweetTextFilter', function () {

  // load the filter's module
  beforeEach(module('tweetboxApp'));

  // initialize a new instance of the filter before each test
  var tweetTextFilter;
  beforeEach(inject(function ($filter) {
    tweetTextFilter = $filter('tweetTextFilter');
  }));

  xit('ハッシュタグとメンションがリンクになること', function () {
    var text = '#Ingress in #Yokohama @tadahiro http://sth';
    var mentions = [
      {
        indices: [
          { 0: 22 },
          { 1: 31 }
        ],
        screen_name: "tadahiro"
      }
    ];
    var hashtags = [
      {
        indices: [
          { 0: 0 },
          { 1: 8 }
        ],
        text: "Ingress"
      },
      {
        indices: [
          { 0: 12 },
          { 1: 21 }
        ],
        text: "Yokohama"
      }
    ]

    console.log(tweetTextFilter(text, mentions, hashtags))
    // expect(tweetTextFilter(text, mentions, hashtags)).toBe('<a target="_blank" href="http://twitter.com/hashtag/Ingress">#Ingress</a> in <a target="_blank" href="http://twitter.com/hashtag/Yokohama">#Yokohama</a> <a target="_blank" href="http://twitter.com/tadahiro">@tadahiro</a> http://sth');
    expect(tweetTextFilter(text, mentions, hashtags)).toBe("<a target='_blank' href='http://twitter.com/hashtag/Ingress'>#Ingress</a> in <a target='_blank' href='http://twitter.com/hashtag/Yokohama'>#Yokohama</a> <a target='_blank' href='http://twitter.com/okmttdhr'>@okmttdhr</a> http://sth");
    // expect(tweetTextFilter(text, mentions, hashtags)).toBe('#Ingress in #Yokohama @tadahiro http://sth');
    // expect(tweetTextFilter(text)).toBe('angularjs <a target="_blank" href="http://twitter.com/hashtag/angularhash">#angularhash</a> <a target="_blank" href="http://twitter.com/angularhash">@angularmention>@angularhash</a>');
  });

});
