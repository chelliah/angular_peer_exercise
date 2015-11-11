/**
 * Created by aronthomas on 11/11/15.
 */
var myApp = angular.module('myApp', []);

myApp.controller('PostController', ['$scope', '$http', function($scope, $http){
    $scope.values = {};
    $scope.order = '';
    $scope.people= [];

    $scope.sortName=function(){
          $scope.order = 'name'
    };

    $scope.sortNumber=function(){
        $scope.order = 'number'
    };

    $scope.sortLocation=function(){
        $scope.order = 'location'

    };

    $scope.getData = function(){
        $http.get('/data').then(function(response){
            $scope.people = response.data;
            console.log(response);
        });
    };

    $scope.clickButton = function(values){
        $http.post('/data', values).then(function(response){
            $scope.getData();
            $scope.values = {};
        })
    };

    $scope.deletePerson = function(person){
        var deletedID = person.id;
        $http.delete('/data', {params: {id: deletedID}}).then(function(response){
            console.log(response);
            $scope.getData();
        });
    };

    $scope.getData();
}]);