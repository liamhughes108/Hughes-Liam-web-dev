module.exports = function () {

    var mongoose = require("mongoose");
    var ListSchema = require("./list.schema.server")();
    var List = mongoose.model("List", ListSchema);

    var api = {
        findMyListsByUser: findMyListsByUser,
        createList: createList
    };
    return api;

    function findMyListsByUser(uid) {
        return List.findById(uid);
    }
    
    function createList(uid, list) {
        list._user = uid;
        return List.create(list)
    }

};