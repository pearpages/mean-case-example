var passport = require('passport');

exports.authenticate = function(req, res, next) {
    var auth = passport.authenticate('local', function(err, user) { //we are invoking the LocalStrategy we've created
        if (err) {
            return next(err);
        }
        if (!user) {
            res.send({
                success: false
            });
        }
        // logIn is a function that passport adds to the request object
        req.logIn(user, function(err) { //this is usually done automatically but we are using an XHR post
            if (err) {
                return next(err);
            }
            res.send({
                success: true,
                user: user
            });
        });
    });

    req.body.password = req.body.password || 'any'; //hack, I don't know why, it doesn't work with blank passwords
    auth(req, res, next);
};
