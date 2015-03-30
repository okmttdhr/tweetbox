'use strict';

describe('Controller: HomeFeedCtrl', function () {

  // load the controller's module
  beforeEach(module('tweetboxApp'));

  var HomeFeedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    HomeFeedCtrl = $controller('HomeFeedCtrl', {
      $scope: scope
    });

    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET(/api\/homeFeedTwitters/).respond(
      [
        {
          'created_at': 'Mon Mar 30 07:53:31 +0000 2015',
          'id': 582450568666304500,
          'id_str': '582450568666304512',
          'text': '『インバウンド消費　過去最高に』訪日外国人消費額は2兆278億円前年比43.1%増の　過去最高額。',
          'source': '<a href="http://mobile.twitter.com" rel="nofollow">Mobile Web</a>',
          'truncated': false,
          'in_reply_to_status_id': null,
          'in_reply_to_status_id_str': null,
          'in_reply_to_user_id': null,
          'in_reply_to_user_id_str': null,
          'in_reply_to_screen_name': null,
          'user': {
            'id': 48238678,
            'id_str': '48238678',
            'name': 'Taiga__( ●―● )',
            'screen_name': 'taiga__'
          }
        }, {
          'created_at': 'Mon Mar 30 07:52:52 +0000 2015',
          'id': 582450405704998900,
          'id_str': '582450405704998912',
          'text': '給与計算も自動化！ 労務作業をラクにすべく、マネーフォワードが『MFクラウド給与』（β版）を提供開始',
          'source': '<a href="http://publicize.wp.com/" rel="nofollow">WordPress.com</a>',
          'truncated': false,
          'in_reply_to_status_id': null,
          'in_reply_to_status_id_str': null,
          'in_reply_to_user_id': null,
          'in_reply_to_user_id_str': null,
          'in_reply_to_screen_name': null,
          'user': {
            'id': 1455031550,
            'id_str': '1455031550',
            'name': 'ファイナンシャルプランナー新聞(お金)',
            'screen_name': 'insurance_paper'
          }
        }, {
          'created_at': 'Mon Mar 30 07:52:48 +0000 2015',
          'id': 582450386402811900,
          'id_str': '582450386402811904',
          'text': '桁違いですね…。 「Pebble Time」が24億円集めてプロジェクト終了 - Kickstarterの記録更新 http://t.co/LMk2IAYAtn #スマートニュース',
          'source': '<a href="https://www.smartnews.com/" rel="nofollow">SmartNews | スマートニュース</a>',
          'truncated': false,
          'in_reply_to_status_id': null,
          'in_reply_to_status_id_str': null,
          'in_reply_to_user_id': null,
          'in_reply_to_user_id_str': null,
          'in_reply_to_screen_name': null,
          'user': {
            'id': 79119874,
            'id_str': '79119874',
            'name': 'イケダハヤト',
            'screen_name': 'IHayato'
          }
        }
      ]
    );
    $httpBackend.flush()

    $scope.tweets = [
      {
        'created_at': 'Mon Mar 30 07:53:31 +0000 2015',
        'id': 582450568666304500,
        'id_str': '582450568666304512',
        'text': 'テストテキスト',
        'source': '<a href="http://mobile.twitter.com" rel="nofollow">Mobile Web</a>',
        'truncated': false,
        'in_reply_to_status_id': null,
        'in_reply_to_status_id_str': null,
        'in_reply_to_user_id': null,
        'in_reply_to_user_id_str': null,
        'in_reply_to_screen_name': null,
        'user': {
          'id': 48238678,
          'id_str': '48238678',
          'name': 'テストユーザー',
          'screen_name': 'taiga__'
        }
      }, {
        'created_at': 'Mon Mar 30 07:52:52 +0000 2015',
        'id': 582450405704998900,
        'id_str': '582450405704998912',
        'text': 'テストテキスト２',
        'source': '<a href="http://publicize.wp.com/" rel="nofollow">WordPress.com</a>',
        'truncated': false,
        'in_reply_to_status_id': null,
        'in_reply_to_status_id_str': null,
        'in_reply_to_user_id': null,
        'in_reply_to_user_id_str': null,
        'in_reply_to_screen_name': null,
        'user': {
          'id': 1455031550,
          'id_str': '1455031550',
          'name': 'テストユーザ２',
          'screen_name': 'insurance_paper'
        }
      }
    ];

  }));

  it('次頁のTweetが取得できること', function () {
    var currentUser = {
      '_id': '5519010b375d47337fa40882',
      'name': 'おかぴ',
      'provider': 'twitter',
      'twitter': {
        'id': 1091737034,
        'id_str': '1091737034',
        'name': 'おかぴ',
        'screen_name': 'okmttdhr',
        'location': '冬南国',
        'profile_location': null,
        'description': 'Javascriptエンジニア',
        'url': 'http://t.co/0QRqfORsBO',
        'token': '1091737034-JAaeDbUcAPv2tYxrhLbteyTQ88FlLPZHr48kbjW',
        'tokenSecret': '25epX17gD6EGPLkh4geseuaoCEEQV81iMzKrjNIKueVZ1'
      }
    };

    var paramsHomeFeedTwitter = {
      id: '',
      count: 50,
      token: currentUser.twitter.token,
      tokenSecret: currentUser.twitter.tokenSecret
    };

    $scope.getNextHomeFeedTwitter();

    expect($scope.tweets[3].text).toEqual('『インバウンド消費　過去最高に』訪日外国人消費額は2兆278億円前年比43.1%増の　過去最高額。');
    expect($scope.tweets[3].user.name).toEqual('Taiga__( ●―● )');
    expect($scope.tweets[4].text).toEqual('給与計算も自動化！ 労務作業をラクにすべく、マネーフォワードが『MFクラウド給与』（β版）を提供開始');
    expect($scope.tweets[4].user.name).toEqual('ファイナンシャルプランナー新聞(お金)');
  });
});
