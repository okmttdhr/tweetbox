'use strict';

describe('Service: homeFeedTwitter', function () {

  // load the service's module
  beforeEach(module('tweetboxApp'));

  // instantiate service
  var homeFeedTwitter;
  beforeEach(inject(function (_homeFeedTwitter_) {
    homeFeedTwitter = _homeFeedTwitter_;
  }));

  it('should do something', function () {
    expect(!!homeFeedTwitter).toBe(true);
  });

});
