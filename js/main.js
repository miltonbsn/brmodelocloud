function MainCtrl($scope) {
  $scope.models = [
    {text:'Lógico'},
    {text:'Conceitual'}];
 
  $scope.addModelConceitual = function() {
    $scope.models.push({text:"Conceitual"});
  };

  $scope.addModelLogico = function() {
    $scope.models.push({text:"Lógico"});
  };
    
}