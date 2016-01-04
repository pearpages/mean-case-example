var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app,config) {
    setMiddleware();
    setViews();

    function setMiddleware() {
        app.use(logger('dev'));
        app.use(bodyParser());

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
