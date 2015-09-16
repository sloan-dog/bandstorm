BandStormApp.controller('AddSongCtrl', ['$scope','$http','$mdDialog','$routeParams','UserService', function($scope,$http,$mdDialog,$routeParams, UserService){
  console.log('AddSongCtrl init')



  $scope.addSong = function(){
    console.log($scope.newSong.file);
    $http.post('/api/song/create',{
      name: $scope.newSong.name,
      description:$scope.newSong.description,
      version:$scope.newSong.version,
      project: $routeParams.id,
      song:$scope.song
    }).success(function(data){
      console.log('this - ',data)
    })
  }

  $scope.closeModal = function() {
      $mdDialog.hide();
  }

}]);
















