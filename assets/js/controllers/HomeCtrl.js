BandStormApp.controller('HomeCtrl', ['$scope','UserService', function($scope, UserService){
  console.log('HomeCtrl init')
  $scope.showInfo = false;
  $scope.showInfoText = false;

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  });

  // $scope.UserService = UserService;
  // $scope.$watchCollection('UserService', function(){
  //   $scope.currentUser = UserService.currentUser;
  // });


}]);