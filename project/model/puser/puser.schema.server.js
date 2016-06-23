module.exports = function () {
    var mongoose = require("mongoose");

    var PUserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        dateCreate: {type: Date, default: Date.now}
    }, {collection: "project.puser"});

    return PUserSchema;
};