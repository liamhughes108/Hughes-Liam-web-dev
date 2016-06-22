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

    function ProfileController($routeParams, UserService, $rootScope, $location) {
        var vm = this;
        var id = $routeParams.uid;

        vm.logout = logout;
        vm.unregister = unregister;
        vm.updateUser = updateUser;

        function init() {
            UserService
                .findUserById(id)
                .then(
                    function (res) {
                        vm.user = res.data;
                    }
                );
        }
        init();
        
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    },
                    function (error) {
                        console.log(error);
                    }
                );
        }

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
                    function (res) {
                        vm.success = "User successfully updated";
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})
();