module.exports = function (app) {

    var models = require("./model/models.server.js")();

    var UserService = require("./services/user.services.server.js")(app, models);
};