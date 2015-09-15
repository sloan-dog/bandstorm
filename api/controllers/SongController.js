/**
 * SongController
 *
 * @description :: Server-side logic for managing Songs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var skipperS3 = require('skipper-s3');
 var s3key = process.env.ACCESS_KEY_ID;
 var s3secret = process.env.SECRET_ACCESS_KEY;

 // var AWS = require('aws-sdk');
 //    AWS.config.region = 'us-west-2';
 //     var fs = require('fs');
 //     AWS.config.update({ accessKeyId: s3secret, secretAccessKey: s3key});

 // console.log(s3key+ ':' + s3secret);

module.exports = {
    create: function(req,res){
        // upload file to S3
        req.file('song').upload({
            adapter: skipperS3,
            key: s3key,
            secret: s3secret,
            bucket: 'bandstorm2'
        }, function (err, filesUploaded) {
            if (err) return res.negotiate(err);
            var results = {
                files: filesUploaded,
                textParams: req.params.all()
            };

            // create Song in database
            // Store s3url in song
            if(results){
                var name = results.textParams.name;
                var description = results.textParams.description;
                var version = results.textParams.version;
                if(req.body.branch) var branch = results.textParams.branch;
                var userId = req.user.id;
                var s3url = results.files[0].extra.Location;
                var project = results.textParams.project;
                Song.create({
                    name: name,
                    description: description,
                    version: version,
                    branch: branch,
                    user: userId,
                    project: project,
                    s3url: s3url
                })
                .then(function(song){
                    console.log(song);
                    res.send(song);
                }).catch(function(err){
                    res.send(400, err);
                })

            }

        });

    }
};

