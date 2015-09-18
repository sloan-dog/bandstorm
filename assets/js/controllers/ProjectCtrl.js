  BandStormApp.controller('ProjectCtrl', ['$scope', '$mdDialog', '$http', '$routeParams','FileUploader','UserService', function($scope,$mdDialog,$http,$routeParams,FileUploader,UserService){
  console.log('ProjectCtrl init')

  $scope.orderField = 'name';

  $scope.users = [];
  $scope.chosenUser = '';
  $scope.userToAdd= '';
  $scope.addProjectResponse;

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  });

  // $scope.currentProjectName = $routeParams.id
  $scope.currentProjectId = ''+$routeParams.id

  // console.log(UserService.currentUser.id)


  $scope.addSongModal = function($event) {
    $mdDialog.show({
        targetEvent: $event,
        templateUrl: 'views/addsong.html',
        controller: 'AddSongCtrl'
    });
  }



  $http.get('/api/user/showAll')
  .success(function(users){
    $scope.users = users;
  })




  $scope.addProject = function(userToAdd){
    // var userId = $scope.userToAdd.id;
    // console.log(userToAdd);
    // for(var name in )
    var chosenUser = $scope.users.filter(function (user) { return user.name == userToAdd });
    console.log(chosenUser[0].id);
    var userId = chosenUser[0].id
  // => [{ "name": "john", "dinner": "sushi" }]
    // console.log(userId);
    // var chosenUserName;
    var projectId;
    projectId = $routeParams.id;
    $http.post('/api/user/addToProject/'+ userId + '/' + projectId)
    .success(function(data){
      $scope.addProjectResponse = data;
      alert('you added'+data.name+'to this project')

    })
  }

  $scope.closeModal = function() {
    $mdDialog.hide();
  }

  $scope.helpModal = function($event) {
    var alert = $mdDialog.alert({
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

  $scope.projects = {};
  $scope.currentTrack = 0;

  $scope.playVersion = function(idx){
    $scope.currentTrack = idx;
    console.log(idx)
  }

  $http.get('/api/user/'+UserService.currentUser.id+'/projects')
  .success(function(data){
    $scope.projects = data;
  })


  // if(typeof UserService.currentUser.id !== undefined || null || ''){
  //   $http.get('/api/user/'+UserService.currentUser.id+'/projects/'+$routeParams.id)
  //   .success(function(data){
  //     $scope.project = data;
  //   })
  // }

  // api/user/:userId/project/:projectId
console.log('/api/user/'+UserService.currentUser.id+'/project/'+$routeParams.id)
if(typeof UserService.currentUser.id !== undefined || null || ''){
    $http.get('/api/user/'+UserService.currentUser.id+'/project/'+$routeParams.id)
    .success(function(data){
      $scope.project = data;
      $scope.nombre = data.name
    })
  }

}]);