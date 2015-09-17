/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var chatlog = [
  {from:'System',msg:'First message'}
];

module.exports = {

  join: function(req,res){
    console.log(req);
    //notify users of join / leave room
    sails.sockets.broadcast('mychatroom','userjoin',{user:req.user.name});
    req.socket.on('disconnect', function(){
      sails.sockets.broadcast('mychatroom','userleave',{user:req.user.name});
    });

    sails.sockets.join(req.socket, 'mychatroom');
    res.send(chatlog);
    // console.log(chatlog);
  },
  post: function(req,res){
    var msg = {
      msg: req.body.msg,
      from: req.user.name
    };
    chatlog.push(msg);
    sails.sockets.broadcast('mychatroom', 'addchat', msg);
    res.send({result:true});
  }

};


