module.exports = function () {

    var mongoose = require("mongoose");
    var ListSchema = require("./list.schema.server")();
    var List = mongoose.model("List", ListSchema);

    var api = {
        findMyListsByUser: findMyListsByUser,
        createList: createList,
        deleteList: deleteList,
        findListById: findListById,
        updateList: updateList,
        shareList: shareList,
        unshareList: unshareList,
        findSharedListsByUser: findSharedListsByUser
    };
    return api;

    function findMyListsByUser(uid) {
        return List.find({_user: uid});
    }

    function createList(uid, list) {
        list._user = uid;
        return List.create(list);
    }

    function deleteList(lid) {
        return List.remove({_id: lid});
    }

    function findListById(lid) {
        return List.findById(lid);
    }

    function updateList(lid, list) {
        return List.update(
            {_id: lid},
            {
                $set: {
                    title: list.title,
                }
            }
        );
    }

    function shareList(lid) {
        return List.update(
            {_id: lid},
            {
                $set: {
                    shared: true
                }
            }
        );
    }

    function unshareList(lid) {
        return List.update(
            {_id: lid},
            {
                $set: {
                    shared: false
                }
            }
        );
    }

    function findSharedListsByUser(uid) {
        return List.find({
            _user: uid,
            shared: true
        });
    }
};