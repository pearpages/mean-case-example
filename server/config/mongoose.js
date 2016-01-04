var mongoose = require('mongoose');

module.exports = function(config) {

    getMessageFromDatabase();
    mongoInit();

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
};
