var myApp = angular.module('myApp', []);
// In LA!!
myApp.controller('AppCtrl', ['$scope', '$http', 
	function($scope, $http) {
    
    var refresh = function(){
        $http.get('/todolist').then(function(response){
        	console.log("Got data!");
            $scope.todolist = response.data;
        });
    };
    refresh();


    $scope.addtodo = function(){ 
    	console.log($scope.todo);       
        $http.post('/todolist', $scope.todo).then(function(response){
            console.log(response);
            refresh();
        });
    };

	$scope.remove = function(id){
        console.log(id);
        $http.delete('/todolist/' + id).then(function(response){
            refresh();
        });
    };

    $scope.edit = function(id){
        console.log(id);
        $http.get('/todolist/' + id).then(function(response){
            $scope.todo = response.data;
        });
    };

    $scope.done = function(id){
        console.log(id);
        $http({method: "OPTIONS",url: '/todolist/' +id}).then(function(response){
            refresh();
        });
    };

    $scope.update = function(){
        console.log($scope.todo._id);
        $http.put('/todolist/' + $scope.todo._id, $scope.todo).then(function(response){
            refresh();
        });
    };

    $scope.deselect = function(){
        $scope.todo= null;
    };



}]);

