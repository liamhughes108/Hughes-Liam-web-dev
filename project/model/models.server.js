module.exports = function () {

    var mongoose = require('mongoose');

    var pUserModel = require("./puser/puser.model.server.js")();
    var listModel = require("./list/list.model.server.js")();
    var movieModel = require("./movie/movie.model.server.js")();

    var models = {
        pUserModel: pUserModel,
        listModel: listModel,
        movieModel: movieModel
    };

    return models;
};