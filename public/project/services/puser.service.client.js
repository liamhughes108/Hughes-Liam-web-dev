(function () {
    angular
        .module("MovieListShare")
        .factory("PUserService", PUserService);

    function PUserService($http) {

        var api = {
            checkLoggedin: checkLoggedin,
            login: login,
            logout: logout,
            register: register,
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function checkLoggedin() {
            return $http.get("/api/p/loggedin");
        }

        function login(user) {
            console.log(user);
            return $http.post("/api/p/login", user);
        }

        function logout(user) {
            return $http.post("/api/p/logout");
        }

        function register(user) {
            return $http.post("/api/p/register", user);
        }

        function createUser(username, password) {
            var url = "/api/p/puser";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function findUserById(id) {
            var url = "/api/p/puser/" + id;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/p/puser/" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/p/puser?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/p/puser/" + id;
            return $http.put(url, newUser);
        }

        function deleteUser(id) {
            var url = "/api/p/puser/" + id;
            return $http.delete(url);
        }
    }
})();