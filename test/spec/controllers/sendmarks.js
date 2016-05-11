'use strict';

describe('Controller: SendmarksCtrl', function () {

  // load the controller's module
  beforeEach(module('inditesmsApp'));

  var SendmarksCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SendmarksCtrl = $controller('SendmarksCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
