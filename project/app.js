module.exports = function (app) {

    var models = require("./model/models.server.js")();

    var PUserService = require("./services/puser.service.server.js")(app, models);
};