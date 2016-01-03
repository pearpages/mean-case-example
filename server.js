var express = require('express');
var app = express();
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = 3030;

setViews();
setMiddleware(); //because we sue static files, it's important this comes before the router
settingRoutes();

app.listen(port);
console.log('Listening on port ' + port + '...');

function setViews() {
    app.set('views', './server/views');
    app.set('view engine', 'jade');
}

function settingRoutes() {
    //this is dangerous because we are accepting all routes
    app.get('*', function(req, res) {
        res.render('index');
    });
}

function setMiddleware() {
    app.use(logger('dev'));
    app.use(bodyParser());

    app.use(stylus.middleware({
        src: './public',
        compile: compile
    }));
    app.use(express.static('./public')); //static server

    app.get('/partials/:partialPath', function (req,res) {
        res.render('partials/' + req.params.partialPath);
    });

    function compile(str, path) {
        return stylus(str).set('filename', path);
    }
}