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

        //this is dangerous because we are accepting all routes
        app.get('*', function(req, res) {
            res.render('index', {
                mongoMessage: config.mongoMessage,
                hello: 'hello'
            });
        });
    }
};
