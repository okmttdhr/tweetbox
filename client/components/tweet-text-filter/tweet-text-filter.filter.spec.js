'use strict';

describe('Filter: tweetTextFilter', function () {

  // load the filter's module
  beforeEach(module('tweetboxApp'));

  // initialize a new instance of the filter before each test
  var tweetTextFilter;
  beforeEach(inject(function ($filter) {
    tweetTextFilter = $filter('tweetTextFilter');
  }));

  it('should return the input prefixed with "tweetTextFilter filter:"', function () {
    var text = 'angularjs';
    expect(tweetTextFilter(text)).toBe('tweetTextFilter filter: ' + text);
  });

});
