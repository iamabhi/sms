'use strict';

describe('Controller: ManagecontactsCtrl', function () {

  // load the controller's module
  beforeEach(module('inditesmsApp'));

  var ManagecontactsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManagecontactsCtrl = $controller('ManagecontactsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
