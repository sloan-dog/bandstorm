BandStormApp.controller('AddSongCtrl', ['$scope','$http','$mdDialog','$routeParams','UserService', function($scope,$http,$mdDialog,$routeParams, UserService){
  console.log('AddSongCtrl init')


  $scope.closeModal = function() {
      $mdDialog.hide();
  }

}]);
















