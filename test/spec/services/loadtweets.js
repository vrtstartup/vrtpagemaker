'use strict';

describe('Service: loadTweets', function () {

  // load the service's module
  beforeEach(module('immersiveAngularApp'));

  // instantiate service
  var loadTweets;
  beforeEach(inject(function (_loadTweets_) {
    loadTweets = _loadTweets_;
  }));

  it('should do something', function () {
    expect(!!loadTweets).toBe(true);
  });

});
