module.exports = function () {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidgets: reorderWidgets
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget
            .find({_page: pageId})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    return Widget.create(widget);
                },
                function (error) {
                    return null;
                }
            );
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
                            name: newWidget.name,
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
                            name: newWidget.name,
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
                            name: newWidget.name,
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
                            name: newWidget.name,
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
                            name: newWidget.name,
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
                            name: newWidget.name
                        }
                    }
                );
                break;
        }
    }

    function reorderWidgets(start, end, pageId) {
        var widgets = find({_page: pageId});
        widgets.forEach(function (widget) {
            if (start < end) {
                if (widget.order >= start && widget.order < end) {
                    var newOrder = widget.order--;
                    setNewOrder(widget._id, newOrder);
                } else if (widget.order === start) {
                    setNewOrder(widget._id, end);
                }
            } else {
                if (widget.order >= end && widget.order < start) {
                    var newOrder = widget.order++;
                    setNewOrder(widget._id, newOrder);
                } else if (widget.order === start) {
                    setNewOrder(widget._id, end);
                }
            }
        });
    }

    function setNewOrder(id, newOrder) {
        return Widget.update(
            {_id: id},
            {
                $set: {
                    order: newOrder
                }
            }
        )
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }
};