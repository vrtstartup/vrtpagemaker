'use strict';

describe('Service: templates', function () {

  // load the service's module
  beforeEach(module('immersiveAngularApp'));

  // instantiate service
  var templates;
  beforeEach(inject(function (_templates_) {
    templates = _templates_;
  }));

  it('should do something', function () {
    expect(!!templates).toBe(true);
  });

});
