module.exports = function() {
    var mongoose = require("mongoose");

    var WidgetTypeEnum = ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'];

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
        widgetType: {type: String, enum: WidgetTypeEnum},
        order: Number,
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        deletable: Boolean,
        formatted: Boolean,
        dateCreate: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};