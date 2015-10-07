'use strict';

describe('Directive: showdown', function () {

  // load the directive's module
  beforeEach(module('immersiveAngularApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<showdown></showdown>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the showdown directive');
  }));
});
