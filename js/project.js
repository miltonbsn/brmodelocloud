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
    otherwise({
      redirectTo: '/'
    });
}
]);


app.controller('loginController', function ($scope, $location) {

  $scope.show = function (place) {
    switch (place) {
    case "login":
      $("#loginform").removeClass("hide");
      $("#forgotPassword").addClass("hide");
      $("#registerform").addClass("hide");
      $("#registerField").removeClass("hide");
      $("#forgotField").removeClass("hide");
      break;
    case "register":
      $("#loginform").addClass("hide");
      $("#forgotPassword").addClass("hide");
      $("#registerform").removeClass("hide");
      $("#registerField").addClass("hide");
      $("#forgotField").addClass("hide");
      break;
    case "password":
      $("#loginform").addClass("hide");
      $("#forgotPassword").removeClass("hide");
      $("#registerform").addClass("hide");
      $("#registerField").addClass("hide");
      $("#forgotField").addClass("hide");
      break;
    }
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

  $scope.recovery = function (user) {
    console.log($("#emailfield"));
    console.log($("#emailfield").children().val());
    var email = $("#emailfield3");
    validateEmpty(email);
    isEmail(email);
  }

});

app.$inject = ['$scope', '$http'];

function validLoginFields() {
  valid = true;
  var email = $("#emailfield");
  var password = $("#passwordfield");

  validateEmpty(email);
  validateEmpty(password);

  isEmail(email);

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

  var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;;

  if (!re.test(txt)) {
    onError(email);
    valid = false;
  } else {
    removeError(email);
    valid = true;
  }
}

function onError(field) {
  field.addClass("error");
}

function removeError(field) {
  field.removeClass("error");
}