 angular.module('myapp').controller('registerController', function ($scope, $location) {
   $scope.login = function () {
     $location.path('/').replace();
   }
 });

 app.$inject = ['$scope', '$http'];
 var valid = true;



 function onError(field) {
   field.addClass("error");
 }

 function removeError(field) {
   field.removeClass("error");
 }