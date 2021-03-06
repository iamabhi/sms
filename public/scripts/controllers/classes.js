'use strict';

/**
 * @ngdoc function
 * @name inditesmsApp.controller:ClassesCtrl
 * @description
 * # ClassesCtrl
 * Controller of the inditesmsApp
 */
angular.module('inditesmsApp')
  .controller('ClassesCtrl', function ($scope, $modal, $mdToast, $rootScope, $mdDialog, $filter, $window, $route, $location, $q, $timeout, Auth, Ref, Data) {

  $scope.contacts = Data.initGroups();

  $scope.groups = {};
  $scope.itemsByPage = 100;
  $scope.contacts.$loaded().then(function(ccsnap) {
  	// angular.forEach(ccsnap, function(cval) {
  	// 	if(!$scope.groups[cval.type]) $scope.groups[cval.type] = [];
  	// 	$scope.groups[cval.type].push(cval);
  	// })
  	// var defaultClass = localStorage.getItem("defaultClass") || Object.keys($scope.groups)[0];
  	// $scope.defaultClass = defaultClass;
  	$scope.rowCollection = $scope.contacts;
  	$scope.displayedCollection = [].concat($scope.rowCollection);
  });
  console.log("contacts", $scope.contacts);
  $scope.removeItem = function removeItem(row, ev) {

    var confirm = $mdDialog.confirm()
    .title('Are You Sure ?')
    .content('You want to delete '+ row.title)
    .ariaLabel('')
    .ok('Yes')
    .cancel('No')
    .targetEvent(ev);

    $mdDialog.show(confirm).then(function() {
        console.log("removing row", row);
        var fbindex = $scope.contacts.$indexFor(angular.copy(row));
        console.log("fbindex", row.id);
        console.log("fbindex", row.$id);
        Data.removeClass(row.$id);
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    }, function() {
      console.log("cancelled");
    });
  }

  $scope.editItem = function editItem(row) {
    $rootScope.editClass = row;
    $location.path('/classes/edit/'+row.$id);
  }
  // $scope.changeFilter = function(key) {
  // 	console.log("key", key);
  // 	$scope.defaultClass = key;
  // 	$scope.rowCollection = $scope.groups[key];
  // 	//$scope.displayedCollection = [].concat($scope.rowCollection);
  // }

});
