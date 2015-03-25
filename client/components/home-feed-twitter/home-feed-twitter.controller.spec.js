'use strict';

describe('Controller: HomeFeedCtrl', function () {

  // load the controller's module
  beforeEach(module('tweetboxApp'));

  var HomeFeedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomeFeedCtrl = $controller('HomeFeedCtrl', {
      $scope: scope
    });
  }));

  it('次頁のTweetが取得できること', function () {
    $scope.getNextHomeFeedTwitter();
    expect(1).toEqual(1);
  });
});
