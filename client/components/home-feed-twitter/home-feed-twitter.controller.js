'use strict';

// Twitter の Home Feed を表示する Controller。
angular.module('tweetboxApp')
  .controller('HomeFeedCtrl', function ($scope, Auth, $cookieStore,
    homeFeedTwitter) {
    $scope.tweets;
    $scope.tweetsLoading = false;
    var currentUser = Auth.getCurrentUser();
    console.log('-----Auth.getCurrentUser()-----');
    console.log(Auth.getCurrentUser());

    $scope.updateHomeFeedTwitter = function() {
      $scope.tweetsLoading = true;
      homeFeedTwitter.index({
        id: '',
        token: currentUser.twitter.token,
        tokenSecret: currentUser.twitter.tokenSecret
      }).$promise.then(function(result) {
        console.log('scc');
        console.log(result);
        $scope.tweets = angular.copy(result);
        $scope.tweetsLoading = false;
      }, function(error) {
        console.log('err')
        $scope.tweetsLoading = false;
      });
    }
  });
