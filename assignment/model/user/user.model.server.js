module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        findFacebookUser: findFacebookUser,
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByFacebookId: findUserByFacebookId
    };
    return api;

    function findFacebookUser(id) {
        return User.findOne({'facebook.id': id});
    }

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        var result = User.findOne({username: username})
        return result;
    }

    function updateUser(id, newUser) {
        return User.update(
            {_id: id},
            {
                $set: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                }
            }
        );
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }
};