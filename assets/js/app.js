console.log('Angular Init')

var BandStormApp = angular.module('BandStormApp', ['bootstrap.fileField','material.chatWindow','ngMaterial','ngRoute','ngAnimate','angularFileUpload']);

BandStormApp.run(['UserService', function(UserService){
  console.log('BandStorm init');
  UserService.check(function(err,data){
    console.log('checking',err,data)
  });
}]);

// ['UserService',function(UserService){

//   console.log('Bloggy reporting for duty.');

//   UserService.check(function(err,data){
//     console.log('checking',err,data)
//   });

BandStormApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){

  $locationProvider.html5Mode(true);

  // /song/new

  $routeProvider
  .when('/',{
    templateUrl: '/views/home.html',
    controller: 'HomeCtrl'
  })
  .when('/projects/:id',{
    templateUrl: '/views/projects.html',
    controller: 'ProjectCtrl'
  })
  .when('/projects/:user_id/project/:id',{
    templateUrl: '/views/project.html',
    controller: 'ProjectCtrl'
  })
  .when('/project/new',{
    templateUrl: '/views/createproject.html',
    controller: 'CreateProjectCtrl'
  })
  .when('/project/:id/song/new',{
    templateUrl: '/views/addsong.html',
    controller: 'AddSongCtrl'
  })
  .otherwise({
    templateUrl:'/views/404.html'
  })

}]);