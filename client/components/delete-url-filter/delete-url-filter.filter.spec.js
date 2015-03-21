'use strict';

describe('Filter: deleteUrlFilter', function () {

  // load the filter's module
  beforeEach(module('tweetboxApp'));

  // initialize a new instance of the filter before each test
  var deleteUrlFilter;
  beforeEach(inject(function ($filter) {
    deleteUrlFilter = $filter('deleteUrlFilter');
  }));

  it('should return the input prefixed with "deleteUrlFilter filter:"', function () {
    var text = 'angularjshttps://angularjs.org/';
    expect(deleteUrlFilter(text)).toBe('angularjs');
  });

});
