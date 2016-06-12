(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams.id;

        function init() {
            UserService
                .findUserById(id)
                .then(
                    function (response) {
                        vm.user = response.data;
                    }
                );
        }

        init();

        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function updateUser() {
            UserService
                .updateUser(id, vm.user)
                .then(
                    function (response) {
                        vm.success = "User successfully updated";
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }
    }

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = function login(username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(
                    function (response) {
                        console.log(response);
                        var user = response.data;
                        if (user) {
                            var id = user._id;
                            $location.url("/user/" + id);
                        }
                    },
                    function (error) {
                        vm.error = "User not found";
                    }
                );
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = function (username, password, pass_verify) {
            if (password === pass_verify) {
                UserService
                    .createUser(username, password)
                    .then(
                        function(response){
                            var user = response.data;
                            $location.url("/user/"+user._id);
                        },
                        function(error){
                            vm.error = error.data;
                        }
                    );
            } else {
                vm.error = "Passwords do not match";
            }
        }
    }
})
();