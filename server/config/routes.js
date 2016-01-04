var passport = require('passport');

module.exports = function(app,config) {

    settingRoutes();

    function settingRoutes() {

        //partials routing example 1
        // app.get('/partials/:partialPath', function(req, res) {
        //     res.render('partials/' + req.params.partialPath);
        // });

        //partials routing example 2
        // app.get('/partials/*', function(req, res) {
        //     res.render('partials/' + req.params[0]);
        // });

        app.get('/partials/*', function(req, res) {
            //bear in mind that we've defined the views folder in /server/views
            res.render('../../public/app/' + req.params[0]);
        });

        app.post('/login', function(req, res, next) {
            var auth = passport.authenticate('local', function(err,user) { //we are invoking the LocalStrategy we've created
                if(err) {
                    return next(err);
                }
                if(!user) {
                    res.send({success:false});
                }
                // logIn is a function that passport adds to the request object
                req.logIn(user, function(err) { //this is usually done automatically but we are using an XHR post
                    if(err) {
                        return next(err);
                    }
                    res.send({success:true, user: user});
                });
            });

            req.body.password = req.body.password || 'any'; //hack, I don't know why, it doesn't work with blank passwords
            auth(req,res,next);
        });

        //this is dangerous because we are accepting all routes
        app.get('*', function(req, res) {
            res.render('index', {
                mongoMessage: config.mongoMessage,
                hello: 'hello'
            });
        });
    }
};
