var mongoose = require('mongoose');

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
    }
};
