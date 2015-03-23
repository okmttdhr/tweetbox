'use strict';

// Twitter の Home Feed を表示する Controller。
angular.module('tweetboxApp')
  .controller('HomeFeedCtrl', function ($scope, Auth, $cookieStore,
    homeFeedTwitter) {
    $scope.tweets;
    $scope.newTweetsLoading = false;
    $scope.nextTweetsLoading = false;
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
      $scope.nextTweetsLoading = true;
      homeFeedTwitter.index(paramsHomeFeedTwitter).$promise.then(function(result) {
        console.log('scc');
        console.log(result);
        $scope.tweets = angular.copy(result);
        $scope.nextTweetsLoading = false;
      }, function(error) {
        console.log('err')
        $scope.nextTweetsLoading = false;
      });
    };

    $scope.getNextHomeFeedTwitter = function() {
      $scope.nextTweetsLoading = true;
      paramsHomeFeedTwitter.max_id = $scope.tweets[$scope.tweets.length-1].id - 100;
      console.log($scope.tweets[$scope.tweets.length-1].id)
      console.log($scope.tweets[$scope.tweets.length-1].id - 100)
      // console.log(parseInt($scope.tweets[$scope.tweets.length-1].id, 10) - 1)
      // console.log(parseInt($scope.tweets[$scope.tweets.length-1].id, 10) - 10)
      // console.log(parseInt($scope.tweets[$scope.tweets.length-1].id, 10) - 80)
      // console.log(parseInt($scope.tweets[$scope.tweets.length-1].id, 10) - 90)
      // console.log(parseInt($scope.tweets[$scope.tweets.length-1].id, 10) - 100)

      homeFeedTwitter.index(paramsHomeFeedTwitter).$promise.then(function(result) {
        console.log('scc: next page');
        console.log(result);
        angular.forEach(result, function(res, i) {
          $scope.tweets.push(res)
        });
        $scope.nextTweetsLoading = false;
      }, function(error) {
        console.log('err: next page')
        $scope.nextTweetsLoading = false;
      });
    };

  });
