(function () {
    angular
        .module("MovieListShare")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/my-lists", {
                templateUrl: "views/list/my-lists.view.client.html",
                controller: "MyListsController",
                controllerAs: "model"
            })
            .when("/shared-lists", {
                templateUrl: "views/list/shared-lists.view.client.html",
                controller: "SharedListsController",
                controllerAs: "model"
            })
            .when("/list", {
                templateUrl: "views/list/list.view.client.html",
                controller: "ListController",
                controllerAs: "model"
            })
            .when("/list-shared", {
                templateUrl: "views/list/list-shared.view.client.html",
                controller: "ListSharedController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/list/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/share", {
                templateUrl: "views/list/share.view.client.html",
                controller: "ShareController",
                controllerAs: "model"
            })
            .when("/friends", {
                templateUrl: "views/friends/friends.view.client.html",
                controller: "FriendsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();