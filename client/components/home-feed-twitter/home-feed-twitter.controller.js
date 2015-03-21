'use strict';

// home-feedを表示するController。
angular.module('tweetboxApp')
  .controller('HomeFeedCtrl', function ($scope, Auth, $cookieStore,
    homeFeedTwitter) {
    $scope.tweets;
    var currentUser = Auth.getCurrentUser();
    console.log('-----Auth.getCurrentUser()-----');
    console.log(Auth.getCurrentUser());

    $scope.updateHomeFeedTwitter = function() {
      homeFeedTwitter.index({
        id: '',
        token: currentUser.twitter.token,
        tokenSecret: currentUser.twitter.tokenSecret
      }).$promise.then(function(result) {
        console.log('scc');
        console.log(result);
        $scope.tweets = angular.copy(result);
      }, function(error) {
        console.log('err')
      });
    }
  });
