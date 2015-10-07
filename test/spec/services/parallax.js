'use strict';

describe('Service: parallax', function () {

  // load the service's module
  beforeEach(module('immersiveAngularApp'));

  // instantiate service
  var parallax;
  beforeEach(inject(function (_parallax_) {
    parallax = _parallax_;
  }));

  it('should do something', function () {
    expect(!!parallax).toBe(true);
  });

});
