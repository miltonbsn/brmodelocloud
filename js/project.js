  var app = angular.module('myapp', ['ngRoute']);

  app.config(['$routeProvider', '$locationProvider',
      function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider.
      when('/', {
        controller: 'loginController',
        templateUrl: 'view/login.html'
      }).
      when('/workspace', {
        controller: 'workspaceController',
        templateUrl: 'view/workspace.html'
      }).
      when('/register', {
        controller: 'registerController',
        templateUrl: 'view/register.html'
      }).
      otherwise({
        redirectTo: '/'
      });
      }
  ]);


  app.controller('loginController', function ($scope, $location) {

    $scope.register = function () {
        $("#loginform").addClass("hide");
        $("#registerform").removeClass("hide");
    }

    $scope.login = function (user) {

      if (validLoginFields(user) == true) {
        console.log(user);
        $location.path('/workspace').replace();
      }

    }
    
    $scope.createUser = function (user) {
     if (validateFields() == true) {
       console.log(user);
       // $location.path('/workspace').replace();
     }
   }
    
  });

  app.$inject = ['$scope', '$http'];

  function validLoginFields() {
    var valid = true;
    var email = $("#emailinput");
    var password = $("#passwordinput");

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

 function validateFields() {
   valid = true;

   var email = $("#regMail");
   var password = $("#regPassword");
   var repassword = $("#regRePassword");

   validateEmpty(email);
   validateEmpty(password);
   validateEmpty(repassword);

   isEmail(email);
   isValidPassword(password, repassword);

   return valid;
 }

 function validateEmpty(field) {
   if (field.children().val() == "") {
     valid = false;
     onError(field);
   } else {
     removeError(field);
   }
 }

 function isValidPassword(pass1, pass2) {
   if (!(pass1.children().val() == pass2.children().val() && pass1.children().val().length > 3)) {
     valid = false;
     onError(pass1);
     onError(pass2);
   } else {
     removeError(pass1);
     removeError(pass2);
   }
 }

 function isEmail(email) {
  var txt = email.children().val();
  if (!(txt.length != 0) && ((txt.indexOf("@") < 1) || (txt.indexOf('.') < 7))){
     onError(email);
     return false;
   } else {
     removeError(email);
     return true;
   }
 }