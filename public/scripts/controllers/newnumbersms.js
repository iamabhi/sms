'use strict';

/**
 * @ngdoc function
 * @name inditesmsApp.controller:NewnumbersmsCtrl
 * @description
 * # NewnumbersmsCtrl
 * Controller of the inditesmsApp
 */
angular.module('inditesmsApp')
  .controller('NewnumbersmsCtrl', function ($scope, Data, $mdDialog, $mdToast) {
    $scope.msg = {send:true};
    var msg = '';
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
    $scope.sendSMS = function(ev) {
      if((!$scope.msg.phone) || (!$scope.msg.text)){
        alert = $mdDialog.alert({
           title: 'Attention',
           content: 'Enter both fields before sending message!!',
           ok: 'Close'
         });

         $mdDialog
           .show( alert )
           .finally(function() {
             alert = undefined;
           });
      }
      else {


      var confirm = $mdDialog.confirm()
      .title('Are You Sure ?')
      .content('You want to send SMS to "'+$scope.msg.phone+'" with "'+$scope.msg.text+'"')
      .ariaLabel('')
      .ok('Yes')
      .cancel('No')
      .targetEvent(ev);

    $mdDialog.show(confirm).then(function() {
    	Data.sendSMS($scope.msg).then(function(resp) {
    		console.log("resp", resp);
            if(resp.status == 'success') {
                msg = "SMS sent successfully!";
                $scope.msg = {};
            } else {
                msg = "Something went wrong... Please send again";
            }
            $mdToast.show(
              $mdToast.simple()
                .content(msg)
                .position($scope.getToastPosition())
                .hideDelay(3000)
            );
    	}, function(err) {
    		console.log("err", err);
    	});
    }, function() {
      console.log("cancelled");
    });
  }
    }
  });
