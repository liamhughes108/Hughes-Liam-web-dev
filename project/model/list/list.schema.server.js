module.exports = function () {
    var mongoose = require("mongoose");

    var ListSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'PUser'},
        title: String,
        shared: {type: Boolean, default: false},
        dateCreate: {type: Date, default: Date.now}
    }, {collection: "project.list"});

    return ListSchema;
};