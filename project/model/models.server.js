module.exports = function () {

    var mongoose = require('mongoose');

    var pUserModel = require("./puser/puser.model.server.js")();

    var models = {
        pUserModel: pUserModel
    };

    return models;
};