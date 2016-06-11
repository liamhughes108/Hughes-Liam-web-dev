module.exports = function (app) {

    var websiteModel = models.websiteModel;

    var websites = [
        {_id: "123", name: "Facebook", developerId: "456"},
        {_id: "234", name: "Tweeter", developerId: "456"},
        {_id: "456", name: "Gizmodo", developerId: "456"},
        {_id: "567", name: "Tic Tac Toe", developerId: "123"},
        {_id: "678", name: "Checkers", developerId: "123"},
        {_id: "789", name: "Chess", developerId: "234"}
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var newWebsite = req.body;

        websiteModel
            .createWebsite(userId, newWebsite)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.status(400).send("Name " + newWebsite.name + " is already in use");
                }
            );
    }

    function findAllWebsitesByUser(req, res) {
        var userId = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.send(website);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }
    

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var newWebsite = req.body;

        websiteModel
            .updatePage(id, newWebsite)
            .then(
                function (website) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to update website with ID: " + id);
                }
            );
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;

        websiteModel
            .deletePage(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to delete website with ID: " + id);
                }
            );
    }
}