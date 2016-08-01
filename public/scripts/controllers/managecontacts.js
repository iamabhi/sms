'use strict';

/**
 * @ngdoc function
 * @name inditesmsApp.controller:ManagecontactsCtrl
 * @description
 * # ManagecontactsCtrl
 * Controller of the inditesmsApp
 */
angular.module('inditesmsApp')
  .controller('updateContactModalCtrl', function($scope, $modalInstance, item, Data) {
    console.log("items", item);
    $scope.item = item;
    $scope.confirm = function(item) {
        console.log("changed item", item);
        $modalInstance.close(item);
    }

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('ManagecontactsCtrl', function ($scope, $modal, $mdToast, $mdDialog, $rootScope, $filter, $window, $route, $location, $q, $timeout, Auth, Ref, Data) {
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
  	$scope.rowCollection = (defaultClass) ? $scope.groups[defaultClass] : [];
  	$scope.displayedCollection = [].concat($scope.rowCollection);
  });
  console.log("contacts", $scope.contacts);
  $scope.removeItem = function removeItem(row, ev) {

    var confirm = $mdDialog.confirm()
    .title('Are You Sure ?')
    .content('You want to delete'+ row.name)
    .ariaLabel('')
    .ok('Yes')
    .cancel('No')
    .targetEvent(ev);

    $mdDialog.show(confirm).then(function() {
      console.log("removing row", row);
      var index = $scope.rowCollection.indexOf(row);
      if (index !== -1) {
          $scope.rowCollection.splice(index, 1);
      }
      $scope.contacts.$remove(row);
    }, function() {
      console.log("cancelled");
    });

  }
  $scope.toastPosition = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };

  $scope.getToastPosition = function() {
    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  $scope.open = function(selectedItem) {
    var modalInstance = $modal.open({
        templateUrl: 'views/editcontact.html',
        controller: 'updateContactModalCtrl',
        resolve: {
          item: function () {
            return selectedItem;
          }
        }
      });

      modalInstance.result.then(function (item) {
        console.log("item", item);
        console.log("selected item", selectedItem);
      //  selectedItem[$scope.filterKey] = true;
        $scope.contacts.$save(selectedItem);
        //$scope.rowCollection = $scope.groups[$scope.defaultClass];
        $mdToast.show(
          $mdToast.simple()
            .content("Saved")
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
  }


  $scope.changeFilter = function(key) {
  	console.log("key", key);
  	$scope.defaultClass = key;
  	$scope.rowCollection = $scope.groups[key];
  	//$scope.displayedCollection = [].concat($scope.rowCollection);
  }

});
