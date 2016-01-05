var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; //it means we use a password and user that we keep in our own db

module.exports = function() {
    var User = mongoose.model('User'); //we pull the model here that we've created in the mongoose.js file
    
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({
                username: username
            }).exec(function(err, user) {
                if (err) {
                    console.log('error calling mongodb');
                }
                if (user && user.authenticate(password)) { //authentiaction
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }).exec(function(err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
};
