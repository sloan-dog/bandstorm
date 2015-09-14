var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    bcrypt = require('bcrypt');

module.exports = {
    http:  {
        customMiddleware: function(app){
            console.log('Express middleware for passport');
            app.use( passport.initialize() );
            app.use( passport.session() );

        }
    }
}