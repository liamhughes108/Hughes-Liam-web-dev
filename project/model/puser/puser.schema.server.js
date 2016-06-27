module.exports = function () {
    var mongoose = require("mongoose");

    var PUserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        admin: {type: Boolean, default: false},
        friends: {
            type: [{
                fid: mongoose.Schema.Types.ObjectId,
                username: String
            }],
            default: []
        },
        dateCreate: {type: Date, default: Date.now},
        google: {
            id:    String,
            token: String
        }
    }, {collection: "project.puser"});

    return PUserSchema;
};