'use strict';

/**
 * @ngdoc service
 * @name inditesmsApp.data
 * @description
 * # data
 * Service in the inditesmsApp.
 */
angular.module('inditesmsApp')
  .service('Data', function (FBURL, $window,  $q, $http, Ref, $firebaseArray, $firebaseObject, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function 
    var Data = {
    	initTemplates: function() {
    		return $firebaseArray(Ref.child(settings.id+"/templates"));
    	},
    	initContacts: function() {
    		return $firebaseArray(Ref.child(settings.id+"/contacts"));
    	},
    	initGroups: function() {
    		return $firebaseArray(Ref.child(settings.id+"/groups"));
    	},
    	initExams: function(gid) {
    		return $firebaseArray(Ref.child(settings.id+"/groups/"+gid+"/exams"));
    	},
    	createTemplate: function(template) {
    		return Ref.child(settings.id+"/templates").push(template);
    	},
    	createTemplate: function(template) {
    		return Ref.child(settings.id+"/templates").push(template);
    	},
    	sendSMS: function(msgData) {
    		console.log("data", msgData);
			var defer = $q.defer();
			//textlocal sms
			var message = {
				username: "sahayarexj@gmail.com",
				hash: "84cd35310cfe7c32815e8dac6bfd608bab87bb41",
				numbers: msgData.phone,
				sender: "TXTLCL",
				message: msgData.text
			};
			//bhashsms
			// var message = {
			// 	user: "8951572125",
			// 	pass: "ba849c5",
			// 	sender: "TESTTO",
			// 	phone: msgData.phone,
			// 	text: msgData.text,
			// 	priority: "ndnd",
			// 	stype: "normal"
			// }
    		console.log("data", message);
    		if(msgData.send) {
				//$http.jsonp("http://bhashsms.com/api/sendmsg.php?callback=JSON_CALLBACK", {params: message}).success(function(data) {
				$http.jsonp("http://api.textlocal.in/send/?callback=JSON_CALLBACK", {params: message}).success(function(data) {
					console.log("api success data", data);
					defer.resolve(data);
				}).error(function(err) {
					console.log("api error data", err);
					defer.resolve({status:"success"});
					//defer.reject(err);
				});
    		} else {
    		  defer.resolve({status:"success"});
    		}


			// Delete the Requested With Header
			// delete $http.defaults.headers.common['X-Requested-With'];
			// $http({
			// url: "http://bhashsms.com/api/sendmsg.php?user=success&pass=654321&sender=BSHSMS&text=This is a  test message&priority=ndns&stype=normal", 
			// headers: {
			//    'Content-Type': 'application/jsonp'
			// },
			// method: "POST"
			// })
			// .success(function(data, status) {
			// console.log("data", data);
			// console.log("status", status);
			// 	defer.resolve(data);
			// },function(err) {
			// 	console.log("err", err);
			// 	defer.reject(error);
			// });

			// var req = {
			// 	method: 'POST',
			// 	url: 'http://bhashsms.com/api/sendmsg.php',
			// 	headers: {
			// 	  'Content-Type': 'application/json'
			// 	},
			// 	data: msgData
			// };

			// Make the API call
			//$http.post('http://bhashsms.com/api/sendmsg.php', msgData, {withCredentials:true}).success(function(resp){
			//}).error(function(error){
			//});
			return defer.promise;
    	},
    	getMenus: function(type) {
    		console.log("type", type);
    		if(type == "school") {
		        return [{
				  'title': 'Send Group SMS',
				  'href': '/compose/group',
				  'class': 'mdi-content-send',
				},{
		          'title': 'Attendance SMS',
		          'href': '/attendance',
		          'class': 'mdi-image-remove-red-eye',
		        },{
		          'title': 'Homework SMS',
		          'href': '/compose/homework',
		          'class': 'mdi-editor-border-color',
		        },{
		          'title': 'Personal SMS',
		          'href': '/personalsms',
		          'class': 'mdi-social-person',
		        },{
		          'title': 'Send Marks SMS',
		          'href': '/sendmarks',
		          'class': 'mdi-social-school',
		        },{
		          'title': 'New number SMS',
		          'href': '/newnumbersms',
		          'class': 'mdi-communication-phone',
		        },{
		          'title': 'Add Contacts',
		          'href': '/contacts',
		          'class': 'mdi-communication-quick-contacts-dialer',
		        },{
		          'title': 'Manage Contacts',
		          'href': '/managecontacts',
		          'class': 'mdi-communication-contacts',
		        },{
		          'title': 'Classes',
		          'href': '/groups/manage',
		          'class': 'mdi-action-group-work',
		        },{
		          'title': 'Exams',
		          'href': '/groups/list',
		          'class': 'mdi-action-assignment',
		        },{
		          'title': 'Templates',
		          'href': '/templates',
		          'class': 'mdi-communication-textsms'
		        }];
			} else if(type == "office") {
				return [{
				  'title': 'Dashboard',
				  'href': '/dashboard',
				  'class': 'mdi-action-dashboard',
				},{
		          'title': 'Wall',
		          'href': '/wall',
		          'class': 'mdi-action-dashboard',
		        },
				{
				  'title': 'Add Teacher',
				  'href': '/addteacher',
				  'class': 'fa fa-user-md'
				},
				{
				  'title': 'Add Student',
				  'href': '/addstudent',
				  'class': 'fa fa-user'
				},
				 {
				  'title': 'Teachers',
				  'href': '/teachers',
				  'class': 'fa fa-user-md'
				},
				{
				  'title': 'Student',
				  'href': '/student',
				  'class': 'fa fa-user'
				},
				{
				  'title': 'Marks',
				  'href': '/addmarks',
				  'class': 'fa fa-user'
				}];
			} else {
				return [];
			}
    	}
    };
    return Data;
  });
