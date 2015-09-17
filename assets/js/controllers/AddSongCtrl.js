BandStormApp.controller('AddSongCtrl', ['$scope','$http','$mdDialog','$location','$routeParams','UserService', function($scope,$http,$mdDialog,$location,$routeParams, UserService){
  console.log('AddSongCtrl init')

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  });

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


    // content type undefined will allow browser to
    // automatically assign content type which will prevent
    // wrong type of assignment
  $scope.closeModal = function() {
      $mdDialog.hide();
  }

    $http.post('/api/song/create', fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
    }).success(function(data){
      $scope.closeModal()
      $location.path('/projects/'+UserService.currentUser.id+'/project/'+$routeParams.id)
      console.log('this - ',data)
    }).error(function(err){
        alert('there was an error uploading the file.');
        console.log(err);
    });
  }

  // close add song modal

}]);


















