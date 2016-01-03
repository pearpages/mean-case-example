var app = require('express')();
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = 3030;

(function setViews () {
    app.set('views', './server/views');
    app.set('view engine','jade');    
})();

(function settingRoutes() {
    //this is dangerous because we are accepting all routes
    app.get('*', function(req, res) {
        res.render('index');
    });
})();

app.listen(port);
console.log('Listening on port ' + port + '...');