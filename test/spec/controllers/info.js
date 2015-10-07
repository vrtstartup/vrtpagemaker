'use strict';

describe('Controller: InfoCtrl', function () {

  // load the controller's module
  beforeEach(module('immersiveAngularApp'));

  var InfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InfoCtrl = $controller('InfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InfoCtrl.awesomeThings.length).toBe(3);
  });
});
