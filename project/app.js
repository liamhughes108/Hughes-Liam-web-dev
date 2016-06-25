module.exports = function (app) {

    var models = require("./model/models.server.js")();

    var PUserService = require("./services/puser.service.server.js")(app, models);
    var ListService = require("./services/list.service.server.js")(app, models);
    var MovieService = require("./services/movie.service.server.js")(app, models);
};