module.exports = function(app) {

    var pages = [
        {_id: "321", name: "Post 1", websiteId: "456"},
        {_id: "432", name: "Post 2", websiteId: "456"},
        {_id: "543", name: "Post 3", websiteId: "456"}
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesByWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;

        for(var i in pages) {
            if(pages[i].name === newPage.name & pages[i].websiteId === newPage.websiteId) {
                res.status(400).send("Name " + newPage.name + " is already in use");
                return;
            }
        }

        newPage._id = (new Date()).getTime() + "";
        pages.push(newPage);
        res.json(newPage);
    }

    function findAllPagesByWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var resultSet = [];

        for (var i in pages) {
            if (pages[i].websiteId === websiteId) {
                resultSet.push(pages[i]);
            }
        }

        res.json(resultSet);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for(var i in pages) {
            if(pageId === pages[i]._id) {
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

    function updatePage(req, res) {
        var id = req.params.pageId;
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

    function deletePage(req, res) {
        var id = req.params.pageId;
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