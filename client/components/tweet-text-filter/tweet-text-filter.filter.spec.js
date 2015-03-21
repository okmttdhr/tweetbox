'use strict';

describe('Filter: tweetTextFilter', function () {

  // load the filter's module
  beforeEach(module('tweetboxApp'));

  // initialize a new instance of the filter before each test
  var tweetTextFilter;
  beforeEach(inject(function ($filter) {
    tweetTextFilter = $filter('tweetTextFilter');
  }));

  it('ハッシュタグとメンションがリンクになること', function () {
    var text = '#Ingress in #Yokohama @tadahiro http://sth';
    var mentions = [
      { screen_name: "tadahiro" }
    ];
    var hashtags = [
      { text: "Ingress" },
      { text: "Yokohama" }
    ]

    expect(tweetTextFilter(text, mentions, hashtags)).toBe("<a target='_blank' href='http://twitter.com/hashtag/Ingress'>#Ingress</a> in <a target='_blank' href='http://twitter.com/hashtag/Yokohama'>#Yokohama</a> <a target='_blank' href='http://twitter.com/tadahiro'>@tadahiro</a> http://sth");
  });

});
