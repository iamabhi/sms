'use strict';

/**
 * @ngdoc function
 * @name inditesmsApp.controller:AttendanceCtrl
 * @description
 * # AttendanceCtrl
 * Controller of the inditesmsApp
 */
angular.module('inditesmsApp')
  .controller('attendanceModalCtrl', function($scope, $modalInstance, items, Data) {
  	console.log("items", items);
    var d = new Date();
    $scope.msg = {
      text: "Your son is absent on "+ d.getDate() + ' ' + months[d.getMonth()] +' '+d.getFullYear(),
      phone: ''
    }
    $scope.users = [];
    $scope.sending = false;
    $scope.usernames = '';
    for (var i = 0; i < items.length; i++) {
      if(items[i].isSelected) {
        $scope.users.push(items[i]);
        if($scope.msg.phone) {
          $scope.msg.phone += ","+items[i].phone;
          $scope.usernames += ", "+items[i].name;
        } 
        else {
          $scope.msg.phone = items[i].phone;
          $scope.usernames = items[i].name;
        }
      }
    };

    $scope.ok = function () {
      $scope.sending = true;
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
  .controller('AttendanceCtrl', function ($scope, $modal, $mdToast, $rootScope, $filter, $window, $route, $location, $q, $timeout, Auth, Ref, Data) {
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

  $scope.open = function() {
    console.log("scope", $scope);
    console.log("multiple", $scope.multiple);
    var modalInstance = $modal.open({
        templateUrl: 'views/attendanceModal.html',
        controller: 'attendanceModalCtrl',
        resolve: {
          items: function () {
            return $scope.rowCollection;
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