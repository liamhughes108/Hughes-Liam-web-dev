module.exports = function () {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function updateWidget(id, newWidget) {
        return Widget.update(
            {_id: id},
            {
                $set: {
                    name: newWidget.name,
                    text: newWidget.text,
                    placeholder: newWidget.placeholder,
                    description: newWidget.description,
                    url: newWidget.url,
                    width: newWidget.width,
                    height: newWidget.height,
                    rows: newWidget.rows,
                    size: newWidget.size,
                    deletable: newWidget.deletable,
                    formatted: newWidget.formatted
                }
            }
        );
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }
};