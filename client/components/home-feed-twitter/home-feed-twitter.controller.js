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

        console.log($scope.tweets[0]);

        $scope.nextTweetsLoading = false;
      }, function(error) {
        console.log('err')
        $scope.nextTweetsLoading = false;
      });
    };

    $scope.getNextHomeFeedTwitter = function() {
      $scope.nextTweetsLoading = true;
      paramsHomeFeedTwitter.since_id = null;
      paramsHomeFeedTwitter.max_id = $scope.tweets[$scope.tweets.length-1].id;

      // console.log($scope.tweets[$scope.tweets.length-1].id);
      // console.log(paramsHomeFeedTwitter.max_id);
      // console.log(paramsHomeFeedTwitter.max_id + 1);

      homeFeedTwitter.index(paramsHomeFeedTwitter).$promise.then(function(result) {
        console.log('scc: next page');
        console.log(result);
        angular.forEach(result, function(res, i) {
          console.log(i);
          if (i = 0) angular.noop;
          $scope.tweets.push(res)
        });

        console.log($scope.tweets[0]);

        $scope.nextTweetsLoading = false;
      }, function(error) {
        console.log('err: next page')
        $scope.nextTweetsLoading = false;
      });
    };

    $scope.getRecentHomeFeedTwitter = function() {
      $scope.newTweetsLoading = true;
      paramsHomeFeedTwitter.max_id = null;
      paramsHomeFeedTwitter.since_id = $scope.tweets[0].id;
      homeFeedTwitter.index(paramsHomeFeedTwitter).$promise.then(function(result) {
        console.log('scc: recent page');
        console.log(result);
        var lastI = result.length - 1;
        angular.forEach(result, function(res, i) {
          if (i = lastI) angular.noop;
          $scope.tweets.unshift(res)
        });

        console.log($scope.tweets[0]);

        $scope.newTweetsLoading = false;
      }, function(error) {
        console.log('err: recent page');
        $scope.newTweetsLoading = false;
      });
    };
  });
