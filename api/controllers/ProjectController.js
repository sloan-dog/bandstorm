/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req,res){
        var name = req.body.name;
        var description = req.body.description;
        Project.create({
            name:name,
            description:description
        }).then(function(project){
            User.findOne({where: {id:'55f60c501098a28e72d6517a'}}).then(function(user){
                project.users.add(user);
                user.projects.add(project);
                user.save();
                return project.save();
            }).then(function(){
                return Project.find({
                    where:{
                        name:{
                            contains: 'email'
                        }
                    }
                }).populate('users');
            }).then(function(project){
                console.log(project.id)
                res.send(project);
            })
            .catch(console.error);
        });
    }

};

