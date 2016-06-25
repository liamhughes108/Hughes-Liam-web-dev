module.exports = function () {
    var mongoose = require("mongoose");

    var MovieSchema = mongoose.Schema({
        _list: {type: mongoose.Schema.Types.ObjectId, ref: 'List'},
        title: String,
        poster: String,
        dateCreate: {type: Date, default: Date.now}
    }, {collection: "project.movie"});

    return MovieSchema;
};