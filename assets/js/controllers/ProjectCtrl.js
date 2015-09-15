BandStormApp.controller('ProjectCtrl', ['$scope', '$mdDialog', 'FileUploader', function($scope,$mdDialog,FileUploader){
  console.log('ProjectCtrl init')

  $scope.addSongModal = function($event) {
    $mdDialog.show({
        targetEvent: $event,
        templateUrl: 'views/addsong.html',
        controller: 'CreateProjectCtrl'
    });
  }

}]);