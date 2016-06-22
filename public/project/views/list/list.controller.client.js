(function () {
    angular
        .module("MovieListShare")
        .controller("MyListsController", MyListsController)
        .controller("SharedListsController", SharedListsController)
        .controller("ListController", ListController)
        .controller("ListSharedController", ListSharedController)
        .controller("SearchController", SearchController)
        .controller("ShareController", ShareController);

    function MyListsController() {
        var vm = this;
    }

    function SharedListsController() {
        var vm = this;
    }

    function ListController() {
        var vm = this;
    }

    function ListSharedController() {
        var vm = this;
    }

    function SearchController() {
        var vm = this;
    }
    
    function ShareController() {
        var vm = this;
    }
})
();