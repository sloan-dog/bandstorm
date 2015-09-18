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
        User.findOne({where:{id:req.params.userId}}).then(function(user){
            Project.findOne({where:{id:req.params.projectId}}).then(function(project){
                user.projects.add(project);
                return user.save();
            }).then(function(){
                User.findOne({id:req.params.userId}).populate('projects')
                .then(function(user){
                    console.log(user);
                    res.send(user);
                }).catch(function(err){
                    res.send(400,err);
                })
            })
            .catch(function(err){
            res.send(400, err);
            });
        })
    },
    showAll: function(req,res){
        User.find().then(function(users){
            res.send(users);
        }).catch(function(err){
            if(err){
                res.send(400,err);
            }
        })
    }
};

