'use strict';

/**
 * @ngdoc function
 * @name inditesmsApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the inditesmsApp
 */
angular.module('inditesmsApp')
  .controller('GroupsCtrl', function ($scope, $rootScope, $routeParams, $location, $filter, Data) {
    $scope.teacher = {subjects:[{subject:''}]};
  	if(templates) {
		$scope.templates = groups;
  	} else {
  		$scope.templates = Data.initGroups();
  	}
  	console.log("params", $routeParams);
  	$scope.type = $routeParams.type;
  	if($routeParams.type == 'manage') {
      $rootScope.title = "Add Classes";
  	} else {
      $rootScope.title = "Select class to add exams"
  	}
  	$scope.selectGroup = function(id, gid) {
  		console.log("gid", gid);
  		if($scope.type == 'list') {
  			$location.path('exams/'+id+'/'+gid);
  		}
  	}
    $scope.addTodo = function () {
        var newTodo = $scope.newTodo.trim();
        if (newTodo.length === 0) {
            return;
        }

        var item = {
            title: newTodo
        };
        $scope.templates.$add(item);
        $scope.newTodo = '';
        $scope.remainingCount++;
    };

    $scope.editTodo = function (template) {
        template.editedTodo = true;
        // Clone the original template to restore it on demand.
        $scope.originalTodo = angular.extend({}, todo);
    };

    $scope.doneEditing = function (template) {
        template.editedTodo = false;
        template.title = template.title.trim();
        console.log("template", template);

        if (!template.title) {
        	$scope.templates.$remove(template);
        } else {
        	$scope.templates.$save(template);
        }
        //templateStorage.update(template);
    };

    $scope.revertEditing = function (template) {
        templates[templates.indexOf(template)] = $scope.originalTodo;
        $scope.doneEditing($scope.originalTodo);
    };

    $scope.removeTodo = function (template) {
        // $scope.remainingCount -= template.completed ? 0 : 1;
        // templates.splice(templates.indexOf(template), 1);
        // templateStorage.destroy(template);
        $scope.templates.$remove(template);
    };

    $scope.todoCompleted = function (todo) {
        $scope.remainingCount += todo.completed ? -1 : 1;
        todoStorage.update(todo);
    };

    $scope.clearCompletedTodos = function () {
        todos.filter(function (todo) {
            if(todo.completed){
                todos.splice(todos.indexOf(todo), 1);
                todoStorage.destroy(todo);
            }
        });
    };

    $scope.markAll = function (completed) {
        todos.forEach(function (todo) {
            todo.completed = completed;
            todoStorage.update(todo);
        });
        $scope.remainingCount = !completed ? todos.length : 0;
    };

    $scope.createSubject = function() {
      $scope.teacher.subjects.push({subject:''});
    }
    $scope.removeSubject = function(index) {
      console.log("index", index);
      $scope.teacher.subjects.splice(index, 1);
    }
    $scope.reset = function() {
      $scope.msg = "";
      reset();
    }

  });
