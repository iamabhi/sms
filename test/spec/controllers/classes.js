'use strict';

describe('Controller: ClassesCtrl', function () {

  // load the controller's module
  beforeEach(module('inditesmsApp'));

  var ClassesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClassesCtrl = $controller('ClassesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
