'use strict';

/**
 * @ngdoc function
 * @name inditesmsApp.controller:AddclassCtrl
 * @description
 * # AddclassCtrl
 * Controller of the inditesmsApp
 */
angular.module('inditesmsApp')
  .controller('AddclassCtrl', function ($scope, Data, $mdDialog) {
    function init() {
      $scope.newclass = {subjects:[{subject:''}]};
    }

    init();

    $scope.save = function(event) {
      if($scope.newclass.title && $scope.newclass.subjects) {
        var data = angular.copy($scope.newclass);
        console.log("data", data);
        var saved = Data.createGroup(data);
        console.log("saved", saved);
        alert = $mdDialog.alert({
           title: 'Class created',
           content: data.class+' has been created successfully',
           ok: 'Close'
         });

         $mdDialog
           .show( alert )
           .finally(function() {
             alert = undefined;
             init();
           });
      }
    }

    $scope.createSubject = function() {
      $scope.newclass.subjects.push({subject:''});
    }
    $scope.removeSubject = function(index) {
      console.log("index", index);
      $scope.newclass.subjects.splice(index, 1);
    }
    $scope.reset = function() {
      $scope.msg = "";
      reset();
    }

  });
