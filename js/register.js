 angular.module('myapp').controller('registerController', function ($scope, $location) {
   $scope.login = function () {
     $location.path('/').replace();
   }

   $scope.register = function (user) {
     if (validateFields() == true) {
       console.log(user);
       // $location.path('/workspace').replace();
     }
   }

 });

 app.$inject = ['$scope', '$http'];
 var valid = true;

 function validateFields() {
   valid = true;

   var name = $("#regName");
   var email = $("#regMail");
   var password = $("#regPassword");
   var repassword = $("#regRePassword");

   validateEmpty(name);
   validateEmpty(email);
   validateEmpty(password);
   validateEmpty(repassword);

   isEmail(email);
   isValidPassword(password, repassword);

   return valid;
 }

 function validateEmpty(field) {
   if (field.val() == "") {
     valid = false;
     onError(field);
   } else {
     removeError(field);
   }
 }

 function isValidPassword(pass1, pass2) {
   if (!(pass1.val() == pass2.val() && pass1.val().length > 3)) {
     valid = false;
     onError(pass1);
     onError(pass2);
   } else {
     removeError(pass1);
     removeError(pass2);
   }

 }

 function isEmail(email) {
  var txt = email.val();
  if (!(txt.length != 0) && ((txt.indexOf("@") < 1) || (txt.indexOf('.') < 7))){
     onError(email);
     return false;
   } else {
     removeError(email);
     return true;
   }
 }

 function onError(field) {
   field.addClass("error");
 }

 function removeError(field) {
   field.removeClass("error");
 }