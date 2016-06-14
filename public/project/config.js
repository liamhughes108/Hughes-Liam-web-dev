(function(){
    angular
        .module("MovieListShare")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/login.view.client.html",
                /*controller: "LoginController",
                controllerAs: "model"*/
            })
            .when("/login", {
                templateUrl: "views/login.view.client.html",
                /*controller: "LoginController",
                controllerAs: "model"*/
            })
            .when("/register", {
                templateUrl: "views/register.view.client.html",
                /*controller: "LoginController",
                controllerAs: "model"*/
            })
            .when("/profile", {
                templateUrl: "views/profile.view.client.html",
                /*controller: "LoginController",
                 controllerAs: "model"*/
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();