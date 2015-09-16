BandStormApp.controller('ProjectCtrl', ['$scope', '$mdDialog', '$http', '$routeParams','FileUploader','UserService', function($scope,$mdDialog,$http,$routeParams,FileUploader,UserService){
  console.log('ProjectCtrl init')

  $scope.orderField = 'name';

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  });

  console.log(UserService.currentUser.id)

  $scope.addSongModal = function($event) {
    $mdDialog.show({
        targetEvent: $event,
        templateUrl: 'views/addsong.html',
        controller: 'AddSongCtrl'
    });
  }

  $scope.closeModal = function() {
    $mdDialog.hide();
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

  $scope.projects = {};

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
console.log('/api/user/'+UserService.currentUser.id+'/songs')
if(typeof UserService.currentUser.id !== undefined || null || ''){
    $http.get('/api/user/'+UserService.currentUser.id+'/songs')
    .success(function(data){
      $scope.project = data;
    })
  }

}]);