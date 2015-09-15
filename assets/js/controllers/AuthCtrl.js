BandStormApp.controller('AuthCtrl', ['$scope','$mdDialog', function($scope,$mdDialog){
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

  $scope.signUp = function(){

  }

  $scope.closeModal = function() {
    $mdDialog.hide();
  }


}]);