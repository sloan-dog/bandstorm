BandStormApp.controller('ProjectCtrl', ['$scope', '$mdDialog', 'FileUploader','UserService', function($scope,$mdDialog,FileUploader,UserService){
  console.log('ProjectCtrl init')

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  });

  $scope.addSongModal = function($event) {
    $mdDialog.show({
        targetEvent: $event,
        templateUrl: 'views/addsong.html',
        controller: 'CreateProjectCtrl'
    });
  }

  $scope.helpModal = function($event) {
    alert = $mdDialog.alert({
        title: 'Help',
        content: 'This is a list of all your projects. To create a new project, click the green plus icon.',
        ok: 'Got it!'
      });

    $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
  }

}]);