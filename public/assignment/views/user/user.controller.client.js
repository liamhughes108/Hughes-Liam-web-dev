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
            vm.user = UserService.findUserById(id);
        }

        init();

        function updateUser(newUser) {
            UserService.updateUser(id, newUser);
        }
    }

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = function (username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.error = "User not found";
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        register = function (username, passoword, pass_verify) {
            if (password === pass_verify) {
                var newUser = UserService.createUser(username, password);
                if (newUser) {
                    $location.url("/profile/" + user._id);
                } else {
                    vm.error = "User could not be created";
                }
            } else {
                vm.error = "Passwords do not match";
            }
        }
    }
})();