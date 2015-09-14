module.exports = {
    create: function(req,res){
        var password = req.body.password;
        var email = req.body.email;
        var name = req.body.name;
        User.create({password:password,email:email,name:name}).then(function(user){
            return res.send(user.email + ' ' + user.password);
        });
    }
};

