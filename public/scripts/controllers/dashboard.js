'use strict';

/**
 * @ngdoc function
 * @name inditesmsApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the inditesmsApp
 */
angular.module('inditesmsApp')
  .controller('DashboardCtrl', function ($scope, Data) {
    $scope.rows = [];
    $scope.count = Data.initCount();
    $scope.count.$ref().once('value', function(csnap) {
      console.log("val", csnap.val());
    	console.log("key", csnap.key());
      var val = csnap.val();
      for(var key in val) {
        var monthVal = key.split('-')[1];
        var monthName = monthsFull[parseInt(monthVal) - 1];
        var item = {
          total: val[key].total,
          month: monthName
        }
        $scope.rows.push(item);
      }
    });
  });
