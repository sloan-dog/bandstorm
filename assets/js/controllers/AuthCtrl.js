BandStormApp.controller('AuthCtrl', ['$scope','$mdDialog','$http', function($scope,$mdDialog,$http){
  console.log('AuthCtrl init')

  $scope.newUser = {
    name: '',
    email:'',
    password:''
  }

  $scope.signUpModal = function($event) {
    $mdDialog.show({
        targetEvent: $event,
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl',
    });
  }

  $scope.logInModal = function($event) {
    $mdDialog.show({
        targetEvent: $event,
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
    });
  }

  $scope.logIn = function(){

  }

  $scope.signUp = function(callback){
    var newUser = $scope.newUser
    $http.post('/api/user/create',{
      name:newUser.name,
      email:newUser.email,
      password:newUser.password
    }).success(function(data){
      console.log(data);
      callback(null,data);
    }).error(console.log);
  }

  $scope.closeModal = function() {
    $mdDialog.hide();
  }


}]);