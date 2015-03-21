'use strict';

// home-feedを表示するController。
angular.module('tweetboxApp')
  .controller('HomeFeedCtrl', function ($scope, Auth, $cookieStore,
    homeFeedTwitter) {
    $scope.message = 'Hello';
    console.log('---------');
    console.log(Auth.getCurrentUser());

    // homeFeedTwitter.twtest({ id: Auth.getCurrentUser()._id });
    // homeFeedTwitter.twtest({ id: 1 });
    homeFeedTwitter.index();
  });