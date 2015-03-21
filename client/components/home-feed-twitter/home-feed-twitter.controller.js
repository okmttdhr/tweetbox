'use strict';

// home-feedを表示するController。
angular.module('tweetboxApp')
  .controller('HomeFeedCtrl', function ($scope, Auth, $cookieStore,
    homeFeedTwitter) {
    $scope.message = 'Hello';
    console.log('-----Auth.getCurrentUser()-----');
    console.log(Auth.getCurrentUser());

    homeFeedTwitter.index();
  });
