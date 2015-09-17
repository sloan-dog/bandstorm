angular.module('material.chatWindow', ['ngMaterial'])
.directive('BandStormChat', function(){
    // Runs during compile

    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: function($scope, $element, $attrs, $transclude, UserService) {
            console.log('inside controller');
            $scope.UserService = UserService;
            $scope.$watchCollection('UserService',function(){
            $scope.currentUser = UserService.currentUser;
                joinChat();
            });

          $scope.messages = [];
          //  //sendMsg msgText

          var scrollChat = function() {
            var chatView = document.querySelector('.chat-window .chat-list');
            chatView.scrollTop = chatView.scrollHeight+100;
          }

          io.socket.on('userjoin', function(data, jwRes){
            console.log('user joined');
            $scope.$evalAsync(function(){
              $scope.messages.push({from:'SYSTEM',msg: data.user + ' joined the chat.'});
              scrollChat();
            });
          });

          io.socket.on('userleave', function(data, jwRes){
            console.log('user left');
            $scope.$evalAsync(function(){
              $scope.messages.push({from:'SYSTEM',msg: data.user + ' left the chat.'});
              scrollChat();
            });
          });

          io.socket.on('addchat', function(msg){
            console.log('chat added');
            $scope.$evalAsync(function(){
              $scope.messages.push(msg);
              scrollChat();
            });
          });

          $scope.sendMsg = function(){
            var data = {msg: $scope.msgText};
            console.log($scope.msgText);
            io.socket.post('/api/chat/post', data, function(data, jwRes){
              $scope.$evalAsync(function(){
                $scope.msgText = '';
              });
            });
          }

          function joinChat(){
            if(!$scope.currentUser) return;

            io.socket.post('/api/chat/join',{},function(data, jwRes){
              //$scope.$apply
              console.log('chat joined');
              $scope.$evalAsync(function(){
                $scope.messages = data;
              });
              console.log('data', data);
            });
          }
        },
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        restrict: 'E',
        template: '<div class="col-md-12">' +
        '<div class="nav-bar nav active">' +
            '<div>' +
                '<div class="chat-window" ng-show="currentUser">' +
                  '<ul class="chat-list">' +
                    '<li ng-repeat="msg in messages">' +
                      '<b>{{msg.from}}:</b> {{msg.msg}}' +
                    '</li>' +
                  '</ul>' +
                  '<form class="inline-form" ng-submit="sendMsg()">' +
                    '<md-input>' +
                        '<input ng-model="msgText" type="text" placeholder="Say something" />' +
                        '<button class="btn btn-xs btn-primary" type="submit">Send</button>' +
                    '</md-input>' +
                  '</form>' +
                '</div>' +
        '</div>' +
    '</div>' +
'</div>',
    // templateUrl: 'fuckoff.html',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        // link: function($scope, iElm, iAttrs, controller) {

        // }
    };
});


// BandStormApp.controller('ChatCtrl',['$scope', 'UserService',function($scope, UserService){

//   $scope.UserService = UserService;
//   $scope.$watchCollection('UserService',function(){
//     $scope.currentUser = UserService.currentUser;
//     joinChat();
//   });

//   $scope.messages = [];
//   //  //sendMsg msgText

//   var scrollChat = function() {
//     var chatView = document.querySelector('.chat-window .chat-list');
//     chatView.scrollTop = chatView.scrollHeight+100;
//   }

//   io.socket.on('userjoin', function(data, jwRes){
//     console.log('user joined');
//     $scope.$evalAsync(function(){
//       $scope.messages.push({from:'SYSTEM',msg: data.user + ' joined the chat.'});
//       scrollChat();
//     });
//   });

//   io.socket.on('userleave', function(data, jwRes){
//     console.log('user left');
//     $scope.$evalAsync(function(){
//       $scope.messages.push({from:'SYSTEM',msg: data.user + ' left the chat.'});
//       scrollChat();
//     });
//   });

//   io.socket.on('addchat', function(msg){
//     console.log('chat added');
//     $scope.$evalAsync(function(){
//       $scope.messages.push(msg);
//       scrollChat();
//     });
//   });

//   $scope.sendMsg = function(){
//     var data = {msg: $scope.msgText};
//     console.log($scope.msgText);
//     io.socket.post('/api/chat/post', data, function(data, jwRes){
//       $scope.$evalAsync(function(){
//         $scope.msgText = '';
//       });
//     });
//   }

//   function joinChat(){
//     if(!$scope.currentUser) return;

//     // io.socket.request({
//     //   method: 'post',
//     //   url: '/api/chat/join',
//     //   params: {},
//     //   headers: {}
//     // })
//     // var data = {data}

//     io.socket.post('/api/chat/join',{},function(data, jwRes){
//       //$scope.$apply
//       console.log('chat joined');
//       $scope.$evalAsync(function(){
//         $scope.messages = data;
//       });
//       console.log('data', data);
//     });
//   }

// }]);