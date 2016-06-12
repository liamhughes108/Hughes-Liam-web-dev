module.exports = function (app, models) {
    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: '/../../public/uploads'});

    var widgets = [
        {_id: "123", widgetType: "HEADER", pageId: "321", size: 2, text: "GIZMODO"},
        {_id: "234", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
        {
            _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
            url: "http://lorempixel.com/400/200/"
        },
        {
            _id: "456",
            widgetType: "HTML",
            pageId: "321",
            text: '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'
        },
        {_id: "567", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
        {
            _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
            url: "https://youtu.be/AM2Ivdi9c4E"
        },
        {_id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsByPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;

        widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.status(400).send("Name " + newWidget.name + " is already in use");
                }
            );
    }

    function findAllWidgetsByPage(req, res) {
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.send(widget);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var newWidget = req.body;

        widgetModel
            .updateWidget(id, newWidget)
            .then(
                function (widget) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to update widget with ID: " + id);
                }
            );
    }

    function deleteWidget(req, res) {
        var id = req.params.widgetId;

        widgetModel
            .deleteWidget(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to delete widget with ID: " + id);
                }
            );
    }

    function uploadImage(req, res) {

        var widget = req.body;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        widget.url = "/uploads/" + filename;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (widget) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to update widget with ID: " + id);
                }
            );
    }
}