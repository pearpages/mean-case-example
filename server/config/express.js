var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function (app,config) {
    setMiddleware();
    setViews();

    function setMiddleware() {
        app.use(logger('dev'));
        // required for sessions, needs to go before the bodyParser
        app.use(cookieParser());
        app.use(bodyParser());
        app.use(session({secret: 'lipsum sum blah'}));
        app.use(passport.initialize());
        app.use(passport.session());

        app.use(stylus.middleware({
            src: config.rootPath + '/public',
            compile: compile
        }));
        app.use(express.static(config.rootPath + '/public')); //static server

        function compile(str, path) {
            return stylus(str).set('filename', path);
        }
    }

    function setViews() {
        app.set('views', config.rootPath + '/server/views');
        app.set('view engine', 'jade');
    }
};
