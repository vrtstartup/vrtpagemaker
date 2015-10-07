'use strict';

describe('Directive: blockText', function () {

  // load the directive's module
  beforeEach(module('immersiveAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<block-text></block-text>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the blockText directive');
  }));
});
