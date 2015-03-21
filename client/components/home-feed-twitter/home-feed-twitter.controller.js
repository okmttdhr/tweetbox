'use strict';

// home-feedを表示するController。
angular.module('tweetboxApp')
  .controller('HomeFeedCtrl', function ($scope, Auth, $cookieStore,
    homeFeedTwitter) {
    $scope.message = 'Hello';
    console.log('-----Auth.getCurrentUser()-----');
    console.log(Auth.getCurrentUser());
    // console.log(currentUser);
    // console.log(currentUser.twitter.token)
    var currentUser = Auth.getCurrentUser();

    // homeFeedTwitter.index({ id: '' });
    homeFeedTwitter.index({
        id: '',
        token: currentUser.twitter.token,
        tokenSecret: currentUser.twitter.tokenSecret
      });

    // homeFeedTwitter.index({
    //     id: ''
    //   },
    //   {
    //     name: 'test',
    //     pass: 'passtest'
    //   });
  });
