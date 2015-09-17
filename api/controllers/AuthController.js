var passport = require('passport');

module.exports = {
    _config: {
        actions:false,
        shortcuts: false,
        rest: false
    },
    process: function(req,res){
        passport.authenticate('local', function(err, user, info){
            if ( (err)||(!user) ) {
                // console.log(err);
                // console.log(user);
                // console.log(info);
                return res.send({
                    message: info.message,
                    user: user
                });
                res.send(err);
            }
            req.logIn(user, function(err) {
                if(err) res.send(err);
                return res.send({
                    message: info.message,
                    user: user
                });
            });
        })(req, res);
    },

    logout: function(req,res) {
        req.logout();
        res.send('logout succesful');
    },
    check: function(req,res) {
        res.send({user: req.user})
    }

};