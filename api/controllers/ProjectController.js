/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req,res){
        var userId = req.user.id
        var name = req.body.name;
        var description = req.body.description;
        Project.create({
            name:name,
            description:description
        }).then(function(project){
            User.findOne({where: {id:userId}}).then(function(user){
                project.users.add(user);
                user.projects.add(project);
                user.save();
                return project.save();
            }).then(function(){
                return Project.findOne({
                    where:{
                        name:name
                    }
                }).populate('users');
            }).then(function(project){
                console.log(project.id)
                res.send(project);
            })
            .catch(console.error);
        });
    },
    showOne: function(req,res){
        var userId = req.params.userId;
        var projectId = req.params.projectId;
        Project.findOne({where:{id:projectId}}).populate('users')
        .then(function(project){
            console.log(project);
            res.send(project);
        }).catch(function(err){
            res.send(400,err);
        })
    },
    showAll: function(req,res){
        var userId = req.params.userId;
        User.findOne({where:{id:userId}}).populate('projects')
        .then(function(user){
            res.send(user);
        }).catch(function(err){
            res.send(400,err);
        })
    }


};

