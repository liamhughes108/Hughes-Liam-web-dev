(function () {
    angular
        .module("MovieListShare")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController($location, PUserService, $rootScope) {
        var vm = this;

        vm.login = function login(username, password) {
            var user = {
                username: username,
                password: password
            }

            PUserService
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

    function RegisterController($location, PUserService, $rootScope) {
        var vm = this;
        vm.register = register;
        vm.registerAsAdmin = registerAsAdmin;

        function register(username, password) {
            var user = {
                username: username,
                password: password
            };

            PUserService
                .register(user)
                .then(
                    function (res) {
                        console.log(res);
                        var userRes = res.data;
                        $rootScope.currentUser = userRes;
                        $location.url("/user/" + userRes._id);

                    },
                    function (error) {
                        console.log(error.data);
                        vm.error = error.data;
                    }
                );
        }

        function registerAsAdmin(username, password) {
            var user = {
                username: username,
                password: password,
                admin: true
            };

            PUserService
                .register(user)
                .then(
                    function (res) {
                        console.log(res);
                        var userRes = res.data;
                        $rootScope.currentUser = userRes;
                        $location.url("/user/" + userRes._id);

                    },
                    function (error) {
                        console.log(error.data);
                        vm.error = error.data;
                    }
                );
        }
    }

    function ProfileController($routeParams, PUserService, $rootScope, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;

        vm.logout = logout;
        vm.unregister = unregister;
        vm.updateUser = updateUser;

        function init() {
            PUserService
                .findUserById(vm.uid)
                .then(
                    function (res) {
                        vm.user = res.data;
                    }
                );
        }
        init();
        
        function logout() {
            PUserService
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
            PUserService
                .deleteUser(vm.uid)
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
            PUserService
                .updateUser(vm.uid, vm.user)
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