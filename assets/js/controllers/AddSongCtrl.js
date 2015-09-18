BandStormApp.controller('AddSongCtrl', ['$scope','$http','$mdDialog','$location','$routeParams','UserService', function($scope,$http,$mdDialog,$location,$routeParams, UserService){
  console.log('AddSongCtrl init')

  $scope.UserService = UserService;
  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  });

  $scope.addSong = function(){
    // file to extensions to check for
    var _validFileExtensions = [".mp3", ".ogg", ".aac", ".aif", ".aiff",".mpeg",".mpg"];
    //
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

    // CHECK
    if (validate(fd)){;
        postSong(fd);
    }


    // content type undefined will allow browser to
    // automatically assign content type which will prevent
    // wrong type of assignment
  $scope.closeModal = function() {
        $mdDialog.hide();
  }

  function postSong(formData) {
    $http.post('/api/song/create', formData, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
    }).success(function(data){
      $scope.closeModal()
      $location.path('/projects/'+UserService.currentUser.id+'/project/'+$routeParams.id)
      console.log('this - ',data)
    }).error(function(err){
        alert('there was an error uploading the file.');
        return err
    });
  }

  // close add song modal

  // this checks a form with type==file against hardcoded filetypes
  function validate(oForm) {
      var arrInputs = document.getElementsByTagName('input');
      for (var i = 0; i < arrInputs.length; i++) {
          var oInput = arrInputs[i];
          if (oInput.type == "file") {
              var sFileName = oInput.value;
              if (sFileName.length > 0) {
                  var blnValid = false;
                  for (var j = 0; j < _validFileExtensions.length; j++) {
                      var sCurExtension = _validFileExtensions[j];
                      if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                          blnValid = true;
                          break;
                      }
                  }

                  if (!blnValid) {
                      var alert = $mdDialog.alert({
                        title: 'Invalid File Type',
                        content: ('Sorry, ' + sFileName + ' is invalid, allowed extensions are: ' + _validFileExtensions.join(", ")),
                        ok: 'Understood, amigo! Donde esta el bibliotecha?'
                      })
                      // alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                      $mdDialog
                        .show( alert )
                        .finally(function(){
                          alert = undefined;
                        })
                      return false;
                  }
              }
          }
      }

      return true;
  }
}
}]);







































