(function () {
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
            .when("/my-lists", {
                templateUrl: "views/my-lists.view.client.html",
                /*controller: "LoginController",
                 controllerAs: "model"*/
            })
            .when("/shared-lists", {
                templateUrl: "views/shared-lists.view.client.html",
                /*controller: "LoginController",
                 controllerAs: "model"*/
            })
            .when("/list", {
                templateUrl: "views/list.view.client.html",
                /*controller: "LoginController",
                 controllerAs: "model"*/
            })
            .when("/list-shared", {
                templateUrl: "views/list-shared.view.client.html",
                /*controller: "LoginController",
                 controllerAs: "model"*/
            })
            .when("/search", {
                templateUrl: "views/search.view.client.html",
                /*controller: "LoginController",
                 controllerAs: "model"*/
            })
            .when("/share", {
                templateUrl: "views/share.view.client.html",
                /*controller: "LoginController",
                 controllerAs: "model"*/
            })
            .when("/friends", {
                templateUrl: "views/friends.view.client.html",
                /*controller: "LoginController",
                 controllerAs: "model"*/
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();