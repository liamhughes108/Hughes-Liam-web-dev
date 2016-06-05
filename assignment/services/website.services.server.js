module.exports = function(app) {
    
    var websites = [
        { _id: "123", name: "Facebook",    developerId: "456" },
        { _id: "234", name: "Tweeter",     developerId: "456" },
        { _id: "456", name: "Gizmodo",     developerId: "456" },
        { _id: "567", name: "Tic Tac Toe", developerId: "123" },
        { _id: "678", name: "Checkers",    developerId: "123" },
        { _id: "789", name: "Chess",       developerId: "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var newWebsite = req.body;

        for(var i in pages) {
            if(pages[i].name === newWebsite.name & pages[i].developerId === newWebsite.developerId) {
                res.status(400).send("Name " + newWebsite.name + " is already in use");
                return;
            }
        }

        newWebsite._id = (new Date()).getTime() + "";
        pages.push(newWebsite);
        res.json(newWebsite);
    }

    function findAllWebsitesByUser(req, res) {
        res.json(pages);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for(var i in pages) {
            if(websiteId === pages[i]._id) {
                res.send(pages[i]);
                return;
            }
        }
        res.send({});
    }

    function findWebsiteByName(name, res) {
        for(var u in pages) {
            if(pages[u].name === name) {
                res.send(pages[u]);
                return;
            }
        }
        res.send({});
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var newWebsite = req.body;
        for(var i in pages) {
            if(pages[i]._id === id) {
                pages[i].name = newWebsite.name;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Website with ID: "+ id +" not found");
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;
        for(var i in pages) {
            if(pages[i]._id === id) {
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove website with ID: " + id);
    }
}