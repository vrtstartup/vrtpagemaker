'use strict';

describe('Service: dialog', function () {

  // load the service's module
  beforeEach(module('immersiveAngularApp'));

  // instantiate service
  var dialog;
  beforeEach(inject(function (_dialog_) {
    dialog = _dialog_;
  }));

  it('should do something', function () {
    expect(!!dialog).toBe(true);
  });

});
