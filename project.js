var app = angular.module('myapp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
        when('/', {
            controller:'loginController',
            templateUrl: 'login.html'
        }).
        when('/workspace', {
            templateUrl: 'workspace.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

app.controller('loginController', function($scope, $location){
        
    $scope.login = function(user){
      
      console.log(user);
      $location.path('/workspace').replace();

    };
});