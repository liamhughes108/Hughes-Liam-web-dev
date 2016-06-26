module.exports = function () {

    var mongoose = require("mongoose");
    var PUserSchema = require("./puser.schema.server")();
    var PUser = mongoose.model("PUser", PUserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addFriend: addFriend,
        deleteFriend: deleteFriend
    };
    return api;

    function createUser(user) {
        return PUser.create(user);
    }

    function findUserById(userId) {
        return PUser.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return PUser.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
         return PUser.findOne({username: username});
    }

    function updateUser(id, newUser) {
        return PUser.update(
            {_id: id},
            {
                $set: {
                    username: newUser.username,
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                }
            }
        );
    }

    function deleteUser(userId) {
        return PUser.remove({_id: userId});
    }

    function addFriend(uid, fid, username) {
        return PUser.update(
            {_id: uid},
            {
                $push: {
                    friends: {
                        _id: fid,
                        username: username
                    }
                }
            }
        );
    }

    function deleteFriend(uid, fid) {
        return PUser.update(
            {_id: uid},
            {
                $pull: {
                    friends: {
                        _id: fid
                    }
                }
            }
        );
    }
};