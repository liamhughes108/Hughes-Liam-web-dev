(function () {
    angular
        .module("MovieListShare")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/puser/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/puser/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/puser/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/puser/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/my-lists", {
                templateUrl: "views/list/my-lists.view.client.html",
                controller: "MyListsController",
                controllerAs: "model"
            })
            .when("/user/:uid/my-lists/:lid", {
                templateUrl: "views/list/list.view.client.html",
                controller: "ListController",
                controllerAs: "model"
            })
            .when("/user/:uid/my-lists/:lid/search", {
                templateUrl: "views/list/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/user/:uid/shared-lists", {
                templateUrl: "views/list/shared-lists.view.client.html",
                controller: "SharedListsController",
                controllerAs: "model"
            })
            .when("/user/:uid/shared-lists/:lid", {
                templateUrl: "views/list/list-shared.view.client.html",
                controller: "ListSharedController",
                controllerAs: "model"
            })
            .when("/user/:uid/friends", {
                templateUrl: "views/friends/friends.view.client.html",
                controller: "FriendsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();