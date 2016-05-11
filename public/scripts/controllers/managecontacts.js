'use strict';

/**
 * @ngdoc function
 * @name inditesmsApp.controller:ManagecontactsCtrl
 * @description
 * # ManagecontactsCtrl
 * Controller of the inditesmsApp
 */
angular.module('inditesmsApp')
  .controller('ManagecontactsCtrl', function ($scope, $modal, $mdToast, $rootScope, $filter, $window, $route, $location, $q, $timeout, Auth, Ref, Data) {
  if(contacts) {
    $scope.contacts = contacts;
  } else {
    $scope.contacts = Data.initContacts();
  }
  $scope.groups = {};
  $scope.itemsByPage = 100;
  $scope.contacts.$loaded().then(function(ccsnap) {
  	angular.forEach(ccsnap, function(cval) {
  		if(!$scope.groups[cval.type]) $scope.groups[cval.type] = [];
  		$scope.groups[cval.type].push(cval);
  	})
  	var defaultClass = localStorage.getItem("defaultClass") || Object.keys($scope.groups)[0];
  	$scope.defaultClass = defaultClass;
  	$scope.rowCollection = $scope.groups[defaultClass];
  	$scope.displayedCollection = [].concat($scope.rowCollection);
  });
  console.log("contacts", $scope.contacts);
  $scope.removeItem = function removeItem(row) {
      console.log("removing row", row);
      var index = $scope.rowCollection.indexOf(row);
      if (index !== -1) {
          $scope.rowCollection.splice(index, 1);
      }
      $scope.contacts.$remove(row);
  }
  $scope.changeFilter = function(key) {
  	console.log("key", key);
  	$scope.defaultClass = key;
  	$scope.rowCollection = $scope.groups[key];
  	//$scope.displayedCollection = [].concat($scope.rowCollection);
  }

});