module.exports = function(app) {

    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {
            "_id": "456",
            "widgetType": "HTML",
            "pageId": "321",
            "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'
        },
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsByPage);
    app.get("/api/page/:widgetId", findWidgetById);
    app.put("/api/page/:widgetId", updateWidget);
    app.delete("/api/page/:widgetId", deleteWidget);

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
        res.json(pages);
    }

    function findPageById(req, res) {
        var websiteId = req.params.pageId;
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