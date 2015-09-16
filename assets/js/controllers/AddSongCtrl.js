BandStormApp.controller('AddSongCtrl', ['$scope','$http','$mdDialog','$routeParams','UserService', function($scope,$http,$mdDialog,$routeParams, UserService){
  console.log('AddSongCtrl init')



  $scope.addSong = function(){
        var fd = new FormData();

        //you can also send other fields
        //this will be available as req.body.title
        //NOTE: files must be added AFTER other form data
        fd.append('name', $scope.titleText);
        //NOTE: files must be added AFTER other form data
        //this will be available as req.body.description
        fd.append('description', $scope.descriptionText);
        //this will be available as req.body.description
        fd.append('version', $scope.versionText);
        //this will be available as req.project;
        fd.append('project', $routeParams.id);

        //song relates to what we called the file
        //in the api on sails
        fd.append('song', $scope.uploadFile);



        $http.post('/api/song/create', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function(data){
          console.log('this - ',data)
        }).error(function(err){
            alert('there was an error uploading the file.');
            console.log(err);
        });
      }
  //   $http.post('/api/song/create',{
  //     name: $scope.newSong.name,
  //     description:$scope.newSong.description,
  //     version:$scope.newSong.version,
  //     project: $routeParams.id,
  //     song:$scope.song
  //   }).success(function(data){
  //     console.log('this - ',data)
  //   })
  // }
  $scope.closeModal = function() {
      $mdDialog.hide();
  }

}]);


















