module.exports = function (app) {

    var models = require("./model/models.server.js")();

    var UserService = require("./services/user.services.server.js")(app, models);
    var WebsiteService = require("./services/website.services.server.js")(app, models);
    var PageService = require("./services/page.services.server.js")(app, models);
    var WidgetService = require("./services/widget.services.server.js")(app, models);
};