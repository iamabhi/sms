'use strict';

describe('Controller: ComposeCtrl', function () {

  // load the controller's module
  beforeEach(module('inditesmsApp'));

  var ComposeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComposeCtrl = $controller('ComposeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
