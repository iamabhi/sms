'use strict';

/**
 * @ngdoc function
 * @name inditesmsApp.controller:AddclassCtrl
 * @description
 * # AddclassCtrl
 * Controller of the inditesmsApp
 */
angular.module('inditesmsApp')
  .controller('AddclassCtrl', function ($scope, $rootScope, $routeParams, $location, Data, $mdDialog) {
    function init() {
      if($routeParams.id) {
        Data.getGroup($routeParams.id).once('value', function(dsnap) {

          $scope.newclass = dsnap.val();
          //$scope.newClass.id = dsnap.key();
        });
        console.log("fb new class", $scope.newClass);
      } else {
        $scope.newclass = {subjects:[{subject:''}],exams:[{title:''}]};
      }
    }

    init();

    $scope.save = function(event) {
      if($scope.newclass.title && $scope.newclass.subjects) {
        var data = angular.copy($scope.newclass);
        console.log("data", data);
        if($routeParams.id) {
          var saved = Data.updateGroup($routeParams.id, data);
          console.log("saved", saved);
          alert = $mdDialog.alert({
            title: 'Class updated',
            content: data.title +' has been updated successfully',
            ok: 'Ok'
          });
        } else {
          var saved = Data.createGroup(data);
          console.log("saved", saved);
          alert = $mdDialog.alert({
            title: 'Class created',
            content: data.title +' has been created successfully',
            ok: 'Ok'
          });
        }

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

    $scope.createExam = function() {
      $scope.newclass.exams.push({title:''});
    }
    $scope.removeExam = function(index) {
      console.log("index", index);
      $scope.newclass.exams.splice(index, 1);
    }

    $scope.reset = function() {
      $scope.msg = "";
      reset();
    }

  });
