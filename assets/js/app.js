console.log('Angular Init')

var BandStormApp = angular.module('BandStormApp', ['ngMaterial','ngRoute','ngAnimate','angularFileUpload']);

BandStormApp.run(function(){
  console.log('BandStorm init');
});

BandStormApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){

  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/',{
    templateUrl: '/views/home.html',
    controller: 'HomeCtrl'
  })
  .when('/project',{
    templateUrl: '/views/project.html',
    controller: 'ProjectCtrl'
  })
  .when('/project/new',{
    templateUrl: '/views/createproject.html',
    controller: 'CreateProjectCtrl'
  })
  .otherwise({
    templateUrl:'/views/404.html'
  })

}]);