'use strict';

describe('Directive: swipeableListItem', function () {

  // load the directive's module
  beforeEach(module('tweetboxApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<swipeable-list-item></swipeable-list-item>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the swipeableListItem directive');
  }));
});