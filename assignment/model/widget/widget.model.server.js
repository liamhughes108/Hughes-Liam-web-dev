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
        switch (newWidget.widgetType) {
            case 'HEADING':
                return Widget.update(
                    {_id: id},
                    {
                        $set: {
                            text: newWidget.text,
                            size: newWidget.size
                        }
                    }
                );
                break;
            case 'IMAGE':
                return Widget.update(
                    {_id: id},
                    {
                        $set: {
                            url: newWidget.url,
                            width: newWidget.width
                        }
                    }
                );
                break;
            case 'YOUTUBE':
                return Widget.update(
                    {_id: id},
                    {
                        $set: {
                            url: newWidget.url,
                            width: newWidget.width
                        }
                    }
                );
                break;
            case 'HTML':
                return Widget.update(
                    {_id: id},
                    {
                        $set: {
                            text: newWidget.text
                        }
                    }
                );
                break;
            case 'TEXT':
                return Widget.update(
                    {_id: id},
                    {
                        $set: {
                            text: newWidget.text,
                            placeholder: newWidget.placeholder,
                            rows: newWidget.rows,
                            formatted: newWidget.formatted
                        }
                    }
                );
                break;
            default:
                return Widget.update(
                    {_id: id},
                    {
                        $set: {
                            name: newWidget.name,
                        }
                    }
                );
                break;
        }
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }
};