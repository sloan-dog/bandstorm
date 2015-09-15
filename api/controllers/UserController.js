module.exports = {
    create: function(req,res){
        var password = req.body.password;
        var email = req.body.email;
        var name = req.body.name;
        User.create({password:password,email:email,name:name})
        .then(function(user){
            return res.send(user);
        }).catch(function(err){
            res.send(400, err);
        });
    },
    addProject: function(req,res){
        // User.findOne({where:{id:req.body.userId}}).then(function(user){
        //     User.add
        // })
    }
};

