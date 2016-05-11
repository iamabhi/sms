'use strict';

describe('Controller: AttendanceCtrl', function () {

  // load the controller's module
  beforeEach(module('inditesmsApp'));

  var AttendanceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AttendanceCtrl = $controller('AttendanceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
