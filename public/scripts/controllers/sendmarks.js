'use strict';

/**
 * @ngdoc function
 * @name inditesmsApp.controller:SendmarksCtrl
 * @description
 * # SendmarksCtrl
 * Controller of the inditesmsApp
 */
angular.module('inditesmsApp')
  .controller('sendmarksModalCtrl', function($scope, $modalInstance, item, Data) {
    console.log("items", item);
    $scope.item = item;
    $scope.step = 1;
    $scope.msg = {text:'',phone:[]};
    if(item) $scope.msg.phone.push(item.phone);
    $scope.confirm = function() {
    	for (var i = 0; i < $scope.item.subjects.length; i++) {
    		if(i == 0) $scope.msg.text = $scope.item.subjects[i].subject +' '+ $scope.item.subjects[i].mark;
    		else $scope.msg.text += "," + $scope.item.subjects[i].subject +' '+ $scope.item.subjects[i].mark;
    	};
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
  .controller('SendmarksCtrl', function ($scope, $modal, $mdToast, $rootScope, $filter, $window, $route, $location, $q, $timeout, Auth, Ref, Data) {
  if(groups) $scope.groups = groups;
  else $scope.groups = Data.initGroups();
  $scope.exams = {};
  $scope.subjects = {};
  $scope.groups.$loaded().then(function(gsnap) {
    console.log("scope groups", $scope.groups);
    var j = 0;
    console.log("gsnap", gsnap);
    angular.forEach(gsnap, function(gval) {
      if(j == 0) {
        $scope.defaultClass = gval.title;
        $scope.defaultExam = gval.exams[Object.keys(gval.exams)[0]].title;
        $scope.filterKey = $rootScope.user.educationalyear +'_'+$scope.defaultExam;
      }
      $scope.exams[gval.title] = gval.exams;
      $scope.subjects[gval.title] = gval.subjects;
      j++;
    });
  });

  if(contacts) {
    $scope.contacts = contacts;
  } else {
    $scope.contacts = Data.initContacts();
  }
  $scope.itemsByPage = 100;
  $scope.groupContacts = {};
  $scope.contacts.$loaded().then(function(ccsnap) {
    var jj = 0;
  	angular.forEach(ccsnap, function(cval) {
      if(jj == 0) $scope.defaultClass = cval.type;
  		if(!$scope.groupContacts[cval.type]) $scope.groupContacts[cval.type] = [];
  		$scope.groupContacts[cval.type].push(cval);
      jj++;
  	});
    console.log("contacts", $scope.groupContacts);
    console.log("default class", $scope.defaultClass);
  	$scope.rowCollection = $scope.groupContacts[$scope.defaultClass];
  	$scope.displayedCollection = [].concat($scope.rowCollection);
  });
  console.log("contacts", $scope.contacts);
  $scope.removeItem = function removeItem(row) {
      $scope.contacts.$remove(row);
  }
  $scope.changeFilter = function(key) {
  	console.log("key", key);
  	$scope.defaultClass = key;
  	$scope.rowCollection = $scope.groupContacts[key];
  	//$scope.displayedCollection = [].concat($scope.rowCollection);
  }
  $scope.changeExam = function(ekey) {
    console.log("ekey", ekey);
    $scope.filterKey = $rootScope.user.educationalyear +'_'+ekey;
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
    selectedItem.subjects = $scope.subjects[$scope.defaultClass];
    var modalInstance = $modal.open({
        templateUrl: 'views/sendmarksModal.html',
        controller: 'sendmarksModalCtrl',
        resolve: {
          item: function () {
            return selectedItem;
          }
        }
      });

      modalInstance.result.then(function (msg) {
        console.log("msg", msg);
        console.log("selected item", selectedItem);
        selectedItem[$scope.filterKey] = true;
        $scope.contacts.$save(selectedItem);
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
