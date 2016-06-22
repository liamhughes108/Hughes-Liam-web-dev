(function () {
    angular
        .module("MovieListShare")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;

        vm.login = function login(username, password) {
            var user = {
                username: username,
                password: password
            }

            UserService
                .login(user)
                .then(
                    function (res) {
                        console.log(res);
                        var userRes = res.data;
                        if (userRes) {
                            $rootScope.currentUser = userRes;
                            $location.url("/user/" + userRes._id);
                        }
                    },
                    function (error) {
                        console.log(error);
                        vm.error = "User not found";
                    }
                );
        }
    }

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;

        vm.register = function (username, password) {
            var user = {
                username: username,
                password: password
            }

            UserService
                .register(user)
                .then(
                    function (res) {
                        console.log(res);
                        var userRes = res.data;
                        $rootScope.currentUser = userRes;
                        $location.url("/user/" + userRes._id);

                    },
                    function (error) {
                        console.log(error);
                        vm.error = error.data;
                    }
                );
        }
    }

    function ProfileController() {
        var vm = this;
    }
})
();