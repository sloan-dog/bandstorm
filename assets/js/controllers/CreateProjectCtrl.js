BandStormApp.controller('CreateProjectCtrl', ['$scope','$mdDialog', '$http', '$location','FileUploader', 'UserService',function($scope,$mdDialog,$http,$location,FileUploader,UserService) {
  console.log('create project');

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  });

  $scope.closeModal = function() {
    $mdDialog.hide();
  }

  $scope.newProject = {
    name:'',
    description:''
  }

  $scope.createProject = function(){
    console.log('fired createProject');
    $http.post('api/project/create',{
      name:$scope.newProject.name,
      description:$scope.newProject.description
    }).success(function(data){
      console.log('project created',data)
      $location.path('/projects/'+ data.users[0].id+'/project/'+data.id)
    }).error(console.log('something went terribly wrong broh'))
  };

}]);
