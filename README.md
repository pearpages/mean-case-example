# mean-case-example

## Walking Skeleton

> A Walking Skeleton is a tiy implementation of the system that performs a small end-to-end function. It need not use the final arhitecture, but it should link together the main architectural components. The architecture and the functionality can evolve in parallel.

- E2E
- Main architectural components
- Iterative

## Components

- Express
- Jade
- nodemon
- passport-local

## .bowerrc

So we install the dependencies in the directory we need so it's publicly available.

```json
{
    "directory": "public/vendor"
}
```

## Data Models

### $http

$http – $http is built into Angular, so there’s no need for the extra overhead of loading in an external dependency. $http is good for quick retrieval of server-side data that doesn’t really need any specific structure or complex behaviors. It’s probably best injected directly into your controllers for simplicity’s sake.

### $resource

$resource – $resouce is good for situations that are slightly more complex than $http. It’s good when you have pretty structured data, but you plan to do most of your crunching, relationships, and other operations on the server side before delivering the API response. $resource doesn’t let you do much once you get the data into your JavaScript app, so you should deliver it to the app in its final state and make more REST calls when you need to manipulate or look at it from a different angle. Any custom behavior on the client side will need a lot of boilerplate.

### restangular

Restangular – Restangular is a perfect option for complex operations on the client side. It lets you easily attach custom behaviors and interact with your data in much the same way as other model paradigms you’ve used in the past. It’s promise-based, clean, and feature-rich. However, it might be overkill if your needs are basic, and it carries along with it any extra implications that come with bringing in additional third-party dependencies.

## Authentication 

By default, if authentication fails, Passport will respond with a 401 Unauthorized status, and any additional route handlers will not be invoked. If authentication succeeds, the next handler will be invoked and the **req.user** property will be set to the authenticated user.

### Using passport-local

It means we use a password and user that we keep in our own db.

```javascript
var mongoose = require('mongoose');
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy; //it means we use a password and user that we keep in our own db

var User = mongoose.model('User'); //we pull the model here that we've created in the mongoose.js file
passport.use(new LocalStrategy(
    // it's important we get the username and password, otherwise it fails
    function(username, password, done) {
        User.findOne({
            username: username
        }).exec(function(err, user) {
            if (user) {
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

passport.deserializeUser(function (id, done) {
	User.findOne({_id:id}).exec(function(err, user) {
		if(user){
			return done(null,user);
		} else{
			return done(null,false);
		}
	});
});
```

Routes

```javascript
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

    auth(req,res,next);
});
```

Middleware in express

```javascript
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

// required for sessions, needs to go before the bodyParser
app.use(cookieParser());
app.use(session({secret: 'lipsum sum blah'}));
app.use(passport.initialize());
app.use(passport.session());
```

Optional, create users

```javascript
 var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String
});

var User = mongoose.model('User', userSchema); //We define the model here

User.find({}).exec(function(err, collection) {
    if (collection.length === 0) {
        User.create({
            firstName: 'Pere',
            lastName: 'Pages',
            username: 'ppages'
        });
        User.create({
            firstName: 'John',
            lastName: 'Smith',
            username: 'jsmith'
        });
        User.create({
            firstName: 'Will',
            lastName: 'Hunting',
            username: 'whunting'
        });
    }
});
```

## Secure Passwords

```
Clear text + Salt -> Hashing Algorithm -> Hashed Password
```

```javascript
require('crypto');

function createSalt() {
    return crypto.randomBytes(128).toString('based64');
}

function hasPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}
```

LocalStrategy with validation function

```javascript
var User = mongoose.model('User'); //we pull the model here that we've created in the mongoose.js file
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({
            username: username
        }).exec(function(err, user) {
            if(err){
                console.log('error calling mongodb');
            }
            if (user && user.authenticate(password)) { // <-- validation function
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }
));
```

Mongo Schema

```javascript
var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    salt: String,
    hashed_pwd: String
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};
```

## logout in the server side

The server keeps track of the session.

```javascript
app.post('/logout', function(req, res) {
    req.logout(); //added by the passport module
    res.end();
});
```

## Persist the user in the client side

So in the template we can pass the user info. Although that's not very safe.

```javascript
app.get('*', function(req, res) {
    res.render('index', {
        bootstrappedUser: req.user //added by passport
    });
});
```

The template

```jade
if !!bootstrappedUser
    script.
        window.bootstrappedUserObject = !{JSON.stringify(bootstrappedUser)}
```

In the Client Side. Factory

```javascript
(function() {
    'use strict';

    angular.module("app")
    .factory('identify',['$window',identify]);

    function identify($window) {

        if(!!$window.bootstrappedUserObject) {
            this.currentUser = $window.bootstrappedUserObject;
        } else {
            this.currentUser = undefined;   
        }
        
        this.isAuthenticated = function() {
            return !!this.currentUser;
        }

        return this;
    }
})();
```

