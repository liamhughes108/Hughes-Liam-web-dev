module.exports = function () {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        dateCreate: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchema;
};