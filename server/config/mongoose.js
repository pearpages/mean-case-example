var mongoose = require('mongoose');
var crypto = require('crypto');

module.exports = function(config) {

    getMessageFromDatabase();
    mongoInit();
    createUsers();

    function mongoInit() {
        mongoose.connect(config.db);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error...'));
        db.once('open', function callback() {
            console.log('multivision db opened');
        });
    }

    function getMessageFromDatabase() {
        var messageSchema = mongoose.Schema({
            message: String
        });
        var Message = mongoose.model('Message', messageSchema);

        Message.findOne().exec(function(err, messageDoc) {
            config.mongoMessage = messageDoc.message;
        });
    }

    function createUsers() {
        var userSchema = mongoose.Schema({
            firstName: String,
            lastName: String,
            username: String,
            salt: String,
            hashed_pwd: String
        });

        var User = mongoose.model('User', userSchema); //We define the model here

        User.find({}).exec(function(err, collection) {
            if (collection.length === 0) {
                var salt,hash;

                salt = createSalt();
                hash = hashPwd(salt,'ppages');
                User.create({
                    firstName: 'Pere',
                    lastName: 'Pages',
                    username: 'ppages',
                    salt: salt,
                    hashed_pwd: hash
                });

                salt = createSalt();
                hash = hashPwd(salt,'jsmith');
                User.create({
                    firstName: 'John',
                    lastName: 'Smith',
                    username: 'jsmith',
                    salt: salt,
                    hashed_pwd: hash
                });

                salt = createSalt();
                hash = hashPwd(salt,'whunting');
                User.create({
                    firstName: 'Will',
                    lastName: 'Hunting',
                    username: 'whunting',
                    salt: salt,
                    hashed_pwd: hash
                });
            }
        });
    }

    function createSalt() {
        return crypto.randomBytes(128).toString('base64');
    }

    function hashPwd(salt, pwd) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    }
};
