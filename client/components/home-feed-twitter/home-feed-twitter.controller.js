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

    var paramsHomeFeedTwitter = {
      id: '',
      count: 50,
      token: currentUser.twitter.token,
      tokenSecret: currentUser.twitter.tokenSecret
    };

    $scope.updateHomeFeedTwitter = function() {
      $scope.tweetsLoading = true;
      homeFeedTwitter.index(paramsHomeFeedTwitter).$promise.then(function(result) {
        console.log('scc');
        console.log(result);
        $scope.tweets = angular.copy(result);
        $scope.tweetsLoading = false;
      }, function(error) {
        console.log('err')
        $scope.tweetsLoading = false;
      });
    };

    $scope.getNextHomeFeedTwitter = function() {
      $scope.tweetsLoading = true;
      paramsHomeFeedTwitter.max_id = $scope.tweets[$scope.tweets.length-1].id;
      homeFeedTwitter.index(paramsHomeFeedTwitter).$promise.then(function(result) {
        console.log('scc: next page');
        console.log(result);
        angular.forEach(result, function(res, i) {
          $scope.tweets.push(res)
        });
        $scope.tweetsLoading = false;
      }, function(error) {
        console.log('err: next page')
        $scope.tweetsLoading = false;
      });
    };
  });
