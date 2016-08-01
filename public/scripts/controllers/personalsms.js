'use strict';

/**
 * @ngdoc function
 * @name inditesmsApp.controller:PersonalsmsCtrl
 * @description
 * # PersonalsmsCtrl
 * Controller of the inditesmsApp
 */
angular.module('inditesmsApp')
  .controller('personalsmsModalCtrl', function($scope, $modalInstance, item, Data) {
  	console.log("items", item);
    $scope.item = item;
    $scope.step = 1;
    $scope.msg = {text:'',phone:[]};
    if(item) $scope.msg.phone.push(item.phone);
    $scope.confirm = function() {
    	$scope.step = 2;
    }
    $scope.ok = function () {
      $scope.step = 3;
      Data.sendSMS($scope.msg).then(function(data) {
        console.log("data", data);
        if(data.status == "failure") $modalInstance.close('Something went wrong. Please send SMS again..');
        else $modalInstance.close("SMS sent successfully!");
      }, function(err) {
        console.log("error", err);
        $modalInstance.dismiss('cancel');
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('PersonalsmsCtrl', function ($scope, $modal, $mdToast, $rootScope, $filter, $window, $route, $location, $q, $timeout, Auth, Ref, Data) {
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
    console.log("row collection", $scope.rowCollection);
  	$scope.displayedCollection = [].concat($scope.rowCollection);
    console.log("display collection", $scope.displayedCollection);
  });
  console.log("contacts", $scope.contacts);
  $scope.removeItem = function removeItem(row) {
      $scope.contacts.$remove(row);
  }
  $scope.changeFilter = function(key) {
  	console.log("key", key);
  	$scope.defaultClass = key;
  	$scope.rowCollection = $scope.groups[key];
  	//$scope.displayedCollection = [].concat($scope.rowCollection);
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
        templateUrl: 'views/personalsmsModal.html',
        controller: 'personalsmsModalCtrl',
        resolve: {
          item: function () {
            return selectedItem;
          }
        }
      });

      modalInstance.result.then(function (msg) {
        console.log("msg", msg);
        //$scope.rowCollection = $scope.groups[$scope.defaultClass];
        $mdToast.show(
          $mdToast.simple()
            .content(msg)
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
  }

});
