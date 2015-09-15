BandStormApp.factory('UserService', ['$http', function($http){
  return {
    login: function(email,password,callback){
      var self = this;
      $http.post('/api/auth',{
        name:name,
        email:email,
        password:password
      }).success(function(data){
        if(data && data.result && data.user) {
          self.currentUser = data.user;
        }else{
          self.currentUser = false;
        }
        callback(null, data);
      }).error(callback);
    },
    check: function(callback){
      // alert('2')
      var self = this;

      $http.get('/api/auth').success(function(data){
        if(data && data.user) {
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

      $http.delete('/api/auth').success(function(data){
        callback(null,data)
      }).error(callback)

    }
  }

}]);