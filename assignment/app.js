module.exports = function (app) {
    var UserService = require("services/user.service.server.js")(app);
    var WebsiteService = require("services/website.service.server.js")(app);
    var PageService = require("services/page.service.server.js")(app);
    var WidgetService = require("services/widget.service.server.js")(app);
};