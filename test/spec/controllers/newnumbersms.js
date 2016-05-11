'use strict';

describe('Controller: NewnumbersmsCtrl', function () {

  // load the controller's module
  beforeEach(module('inditesmsApp'));

  var NewnumbersmsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewnumbersmsCtrl = $controller('NewnumbersmsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
