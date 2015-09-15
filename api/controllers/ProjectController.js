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
        }).then(function(err,project){
            if(err){return console.log(err);}
            project.users.add(req.session.user);
            project.save(function(err){})
        });
    }

};

