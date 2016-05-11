'use strict';

/**
 * @ngdoc function
 * @name inditesmsApp.controller:ComposeCtrl
 * @description
 * # ComposeCtrl
 * Controller of the inditesmsApp
 */
angular.module('inditesmsApp')
  .controller('ComposeCtrl', function ($scope, $rootScope, $routeParams, Data, $mdDialog) {
  console.log("Teacher Settings", settings);
  console.log("routeParams", $routeParams);
  $scope.type = $routeParams.type;
  if(contacts) {
    $scope.contacts = contacts;
  } else {
    $scope.contacts = Data.initContacts();
  }
  if(templates) {
    $scope.templates = templates;
  } else {
    $scope.templates = Data.initTemplates();
  }
  if($routeParams.type == 'group') {
    $scope.groups = {all:'all'};
    $scope.msgTitle = "Enter message here..";
    $scope.grpLabel = "Select a group";
    $rootScope.title = "Send Group SMS";
  } else {
    $scope.groups = {};
    $scope.msgTitle = "Enter Homework here";
    $scope.grpLabel = "Select a class";
    $rootScope.title = "Send Homework SMS";
  }
  var allcontacts = {};
  $scope.contacts.$loaded().then(function(ccsnap) {
  	var ci = 0;
  	angular.forEach(ccsnap, function(cval) {
  		if(ci == 0) {
  			allcontacts['all'] = cval.phone;
  		} else {
  			allcontacts['all'] += ","+cval.phone;
  		}
  		if(allcontacts[cval.type]) {
  			allcontacts[cval.type] += ","+cval.phone;
  		} else {
  			$scope.groups[cval.type] = cval.type;
  			allcontacts[cval.type] = cval.phone;
  		}
      ci++;
    });
      console.log("All contacts", allcontacts);
  });
  var reset = function() {
    $scope.importing = false;
    $scope.msg = '';
    $scope.step = 1;
    $scope.newgroup = true;
    $scope.newmsg = true;
    $scope.teacher = {};
    $scope.required = false;
  }

  reset();
  $scope.next = function(step) {
    $scope.step = step + 1;
    console.log("Next Step", step);
    if(step == 2) {
      $scope.importing = true;
      console.log("finally", $scope.teacher);
      var msgData = {
        user : "success",
        pass : "654321",
        sender : "BSHSMS",
        phone : $scope.teacher.phone,
        text : $scope.teacher.msg,
        priority : "ndnd",
        stype : "normal"
      }
      console.log("msgData", msgData);
      Data.sendSMS(msgData).then(function(response) {
        console.log('response', response);
        $scope.importing = false;
        if(response.status == "success") {
          $scope.msg = "SMS sent successfully!";
        } else {
          $scope.msg = "Something went wrong. Please send again. :-(";
        }
      }, function(err) {
        console.log('error', err);
      });
    }
  }

  $scope.selectGroup = function(groupType, ev) {
    $scope.teacher.type = groupType;
  	$scope.teacher.phone = allcontacts[groupType];
    var confirm = $mdDialog.confirm()
      .title('Are You Sure ?')
      .content('You want to send SMS to "'+$scope.teacher.type+'" with "'+$scope.teacher.msg+'"')
      .ariaLabel('Lucky day')
      .ok('Yes')
      .cancel('No')
      .targetEvent(ev);

    $mdDialog.show(confirm).then(function() {
  	  $scope.next($scope.step);
    }, function() {
      console.log("cancelled");
    });
  }
  $scope.selectTemplate = function(template) {
  	$scope.teacher.msg = template;
  	$scope.next($scope.step);
  }

  $scope.previous = function(step) {
  	console.log("Step", step);
    $scope.teacher.type = '';
    $scope.teacher.phone = '';
  	$scope.step = step - 1;
  }
  $scope.reset = function() {
    $scope.msg = "";
    reset();
  }

  $scope.showConfirm = function(ev) {
    
  };
});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};
