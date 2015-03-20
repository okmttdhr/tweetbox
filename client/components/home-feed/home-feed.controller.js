'use strict';

// home-feedを表示するController。
angular.module('tweetboxApp')
  .controller('HomeFeedCtrl', function ($scope, Auth, $cookieStore) {
    $scope.message = 'Hello';
    console.log('---------');
    console.log(Auth.getCurrentUser());
  });
