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
      initClasses: function() {
        return $firebaseArray(Ref.child(settings.id+"/classes"));
      },
      createGroup: function(groupData) {
        return Ref.child(settings.id+"/groups").push(groupData);
      },
      getGroup: function(id) {
        return Ref.child(settings.id+"/groups/"+id);
      },
      updateGroup: function(id, groupData) {
        return Ref.child(settings.id+"/groups/"+id).set(groupData);
      },
      removeClass: function(classId) {
        return Ref.child(settings.id+"/groups/"+classId).remove();
      },
    	initGroups: function() {
    		return $firebaseArray(Ref.child(settings.id+"/groups"));
    	},
      initCount: function() {
    		return $firebaseObject(Ref.child(settings.id+"/count").limitToLast(6));
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
        if(msgData.teacher) {
          var template = encodeURI("Dear teacher, "+msgData.text);
        } else {
          var template = encodeURI("Dear parent, "+msgData.text);
        }

  			var message = {
  				username: "sahayarexj@gmail.com",
  				hash: "126681ADrjB7IUXeOK57ebae6a",
  				numbers: msgData.phone.toString(','),
  				sender: "SCHOOL",
  				message: template
          test: true
  			};
        var numberOfSMS = msgData.msgCount ? msgData.msgCount : 1;
        var url = "http://api.msg91.com/api/sendhttp.php?authkey="+message.hash+"&mobiles="+message.numbers+"&message="+message.message+"&sender="+message.sender+"&response=json";
        var d = new Date();
        var cyear = d.getFullYear();
        var cmonth = ("0" + (d.getMonth() + 1)).slice(-2);
    		console.log("data just before sending SMS", message);
				$http.jsonp(url, {params: {}}).success(function(data) {
					console.log("api success data", data);
          Ref.child(settings.id+'/count/'+cyear+'-'+cmonth+'/total').transaction(function(total) {
            console.log("total", total);
            if(total >= 0) {
              console.log("yes", total + msgData.phone.length);
              return total + (msgData.phone.length * numberOfSMS);
            } else {
              console.log("no", msgData.phone.length);
              return (msgData.phone.length * numberOfSMS);
            }
          }, function(error, committed, snapshot) {
            if (error) {
              defer.reject(error);
            } else {
              defer.resolve(data);
            }
          });
				}).error(function(err) {
					console.log("api error data", err);
          if(!err) {
            Ref.child(settings.id+'/count/'+cyear+'-'+cmonth+'/total').transaction(function(total) {
              console.log("total", total);
              if(total >= 0) {
                console.log("yes", total + msgData.phone.length);
                return total + msgData.phone.length;
              } else {
                console.log("no", msgData.phone.length);
                return msgData.phone.length;
              }
            }, function(error, committed, snapshot) {
              if (error) {
                defer.reject(error);
              } else {
                defer.resolve({status:'success'});
              }
            });
          } else {
            defer.reject(err);
          }
				});

			  return defer.promise;
    	},

      sendSMSOld: function(msgData) {
        console.log("data", msgData);
      var defer = $q.defer();
      //textlocal sms
      if(msgData.teacher) {
        var template = encodeURI("Dear teacher, "+msgData.text);
      } else {
        var template = encodeURI("Dear parent, "+msgData.text);
      }

			var message = {
				username: "sahayarexj@gmail.com",
				hash: "21e351caf1a6c4b2895e2f025e10c4a10476edfe",
				numbers: msgData.phone.toString(','),
				sender: "SCHOOL",
				message: template
        //test: true
      };
      // {username:"sahayarexj@gmail.com",hash:"21e351caf1a6c4b2895e2f025e10c4a10476edfe",
      // numbers:a.phone,sender:"SCHOOL",message:encodeURI("Dear teacher,\n\n "+a.text)};
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
        var d = new Date();
        var cyear = d.getFullYear();
        var cmonth = ("0" + (d.getMonth() + 1)).slice(-2);
        console.log("data just before sending SMS", message);
        //var msgSize = parseInt(message.message.length/160);
        //console.log("msgSize", msgSize);
        //if(msgData.send) {
          //$http.jsonp("http://bhashsms.com/api/sendmsg.php?callback=JSON_CALLBACK", {params: message}).success(function(data) {
          $http.jsonp("http://api.textlocal.in/send/?callback=JSON_CALLBACK", {params: message}).success(function(data) {
            console.log("api success data", data);
            Ref.child(settings.id+'/count/'+cyear+'-'+cmonth+'/total').transaction(function(total) {
              console.log("total", total);
              if(total >= 0) {
                console.log("yes", total + msgData.phone.length);
                return total + msgData.phone.length;
              } else {
                console.log("no", msgData.phone.length);
                return msgData.phone.length;
              }
            }, function(error, committed, snapshot) {
              if (error) {
                defer.reject(error);
              } else {
                defer.resolve(data);
              }
            });
          }).error(function(err) {
            console.log("api error data", err);
            //defer.resolve({status:"success"});
            defer.reject(err);
          });

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
    				  'title': 'Dashboard',
    				  'href': '/dashboard',
    				  'class': 'mdi-navigation-apps',
				    },
            {
    				  'title': 'Send Group SMS',
    				  'href': '/compose/group',
    				  'class': 'mdi-content-send',
				    },
            {
		          'title': 'Send Attendance SMS',
		          'href': '/attendance',
		          'class': 'mdi-image-remove-red-eye',
		        },{
		          'title': 'Send Homework SMS',
		          'href': '/compose/homework',
		          'class': 'mdi-editor-border-color',
		        },{
		          'title': 'Send Personal SMS',
		          'href': '/personalsms',
		          'class': 'mdi-social-person',
		        },{
		          'title': 'Send Marks SMS',
		          'href': '/sendmarks',
		          'class': 'mdi-social-school',
		        },{
		          'title': 'Send New number SMS',
		          'href': '/newnumbersms',
		          'class': 'mdi-communication-phone',
		        },{
		          'title': 'Add New Contact',
		          'href': '/contacts',
		          'class': 'mdi-communication-quick-contacts-dialer',
		        },{
		          'title': 'Manage Contacts',
		          'href': '/managecontacts',
		          'class': 'mdi-communication-contacts',
		        },{
		          'title': 'Manage Classes',
		          'href': '/classes',
		          'class': 'mdi-action-group-work',
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
