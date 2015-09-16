BandStormApp.factory('UserService', ['$http','$location', function($http,$location){
  return {
    login: function(email,password,callback){
      var self = this;
      $http.post('/api/auth/login',{
        name:name,
        email:email,
        password:password
      }).success(function(data){
        if(data) {
          self.currentUser = data.user;
          $location.path('/projects/'+data.user.id)
          console.log('this -',data.user)
        }else{
          console.log('else')
          self.currentUser = false;
        }
        callback(null, data);
      }).error(callback);
    },
    check: function(callback){
      // alert('2')
      var self = this;

      $http.get('/api/auth/').success(function(data){
        if(data) {
          console.log(data)
          self.currentUser = data.user;
        }else{
          self.currentUser = false;
        }
        callback(null, data);
      }).error(callback);

    },
    logout: function(callback){
      // alert('3')
      this.currentUser = false;

      $http.get('/api/auth/logout').success(function(data){
        $location.path('/')
        // callback(null,data)
      }).error(callback)

    }
  }

}]);