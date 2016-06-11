module.exports = function () {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsite(userId, website) {
        return Website.create(website);
    }

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

    function updateWebsite(id, newWebsite) {
        return Website.update(
            {_id: id},
            {
                $set: {
                    name: newWebsite.name,
                    description: newWebsite.description
                }
            }
        );
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }
};