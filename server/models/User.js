var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    salt: String,
    hashed_pwd: String,
    roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encryption.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};

exports.createDefaultUsers = function() {
    var User = mongoose.model('User', userSchema); //We define the model here

    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var salt, hash;

            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'ppages');
            User.create({
                firstName: 'Pere',
                lastName: 'Pages',
                username: 'ppages',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            });

            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'jsmith');
            User.create({
                firstName: 'John',
                lastName: 'Smith',
                username: 'jsmith',
                salt: salt,
                hashed_pwd: hash,
                roles: []
            });

            salt = encryption.createSalt();
            hash = encryption.hashPwd(salt, 'whunting');
            User.create({
                firstName: 'Will',
                lastName: 'Hunting',
                username: 'whunting',
                salt: salt,
                hashed_pwd: hash,
                roles: []
            });
        }
    });
};
