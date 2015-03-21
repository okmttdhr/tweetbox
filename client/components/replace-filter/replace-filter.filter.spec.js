'use strict';

describe('Filter: replaceFilter', function () {

  // load the filter's module
  beforeEach(module('tweetboxApp'));

  // initialize a new instance of the filter before each test
  var replaceFilter;
  beforeEach(inject(function ($filter) {
    replaceFilter = $filter('replaceFilter');
  }));

  it('should return the input prefixed with "replaceFilter filter:"', function () {
    var text = 'angularjs';
    expect(replaceFilter(text)).toBe('replaceFilter filter: ' + text);
  });

});
