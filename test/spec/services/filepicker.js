'use strict';

describe('Service: filepicker', function () {

  // load the service's module
  beforeEach(module('immersiveAngularApp'));

  // instantiate service
  var filepicker;
  beforeEach(inject(function (_filepicker_) {
    filepicker = _filepicker_;
  }));

  it('should do something', function () {
    expect(!!filepicker).toBe(true);
  });

});
