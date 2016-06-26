(function () {
    angular
        .module("MovieListShare")
        .controller("FriendsController", FriendsController);

    function FriendsController($routeParams, PUserService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.addFriend = addFriend;
        vm.deleteFriend = deleteFriend;

        function init() {
            PUserService
                .findUserById(vm.uid)
                .then(
                    function (response) {
                        vm.user = response.data;
                    },
                    function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                );
        }

        init();

        function addFriend(username) {
            PUserService
                .findUserByUsername(username)
                .then(
                    function (response) {
                        var friend = response.data;
                        console.log(friend);
                        PUserService
                            .addFriend(vm.uid, friend._id, friend.username)
                            .then(
                                function (response) {
                                    console.log(response);
                                    init()
                                },
                                function (error) {
                                    console.log(error);
                                    vm.error = error;
                                }
                            );
                    },
                    function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                );
        }

        function deleteFriend(fid) {
            console.log(fid);
            PUserService
                .deleteFriend(vm.uid, fid)
                .then(
                    init(),
                    function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                );
        }
    }
})
();