'use strict';

describe('Controller: PersonalsmsCtrl', function () {

  // load the controller's module
  beforeEach(module('inditesmsApp'));

  var PersonalsmsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonalsmsCtrl = $controller('PersonalsmsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
