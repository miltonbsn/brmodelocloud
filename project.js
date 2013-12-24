  var app = angular.module('myapp', ['ngRoute']);

  app.config(['$routeProvider', '$locationProvider',
      function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider.
      when('/', {
        controller: 'loginController',
        templateUrl: 'login.html'
      }).
      when('/workspace', {
        controller: 'workspaceController',
        templateUrl: 'workspace.html'
      }).
      when('/register', {
        controller: 'registerController',
        templateUrl: 'register.html'
      }).
      otherwise({
        redirectTo: '/'
      });
      }
  ]);


  app.controller('loginController', function ($scope, $location) {

    $scope.register = function () {
      $location.path('/register').replace();
    }

    $scope.login = function (user) {

      if (validLoginFields(user) == true) {
        console.log(user);
        $location.path('/workspace').replace();
      }

    }
  });

  app.controller('registerController', function ($scope, $location) {

    $scope.login = function () {
      $location.path('/').replace();
    }


  });

  app.$inject = ['$scope', '$http'];

  function validLoginFields() {
    var valid = true;
    var email = $("#emailfield");
    var password = $("#passwordfield");

    if (email.val() == "") {
      $("#emailfield").addClass("error");
      valid = false;
    } else {
      $("#emailfield").removeClass("error");
    }

    if (password.val() == "") {
      $("#passwordfield").addClass("error");
      valid = false;
    } else {
      $("#passwordfield").removeClass("error");
    }

    return valid;
  }