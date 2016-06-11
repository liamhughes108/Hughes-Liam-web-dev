module.exports = function () {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [Website],
        dateCreate: {type: Date, default: Date.now}
    }, {collection: "assignment.user"});

    return UserSchema;
};