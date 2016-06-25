(function () {
    angular
        .module("MovieListShare")
        .controller("MyListsController", MyListsController)
        .controller("SharedListsController", SharedListsController)
        .controller("ListController", ListController)
        .controller("ListSharedController", ListSharedController)
        .controller("ShareController", ShareController);

    function MyListsController($routeParams, ListService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createList = createList;
        vm.deleteList = deleteList;

        function init() {
            ListService
                .findMyListsByUser(vm.uid)
                .then(
                    function (response) {
                        vm.lists = response.data;
                    },
                    function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                );
        }
        init();

        function createList() {
            ListService
                .createList(vm.uid)
                .then(
                    function (response) {
                        vm.newList = response.data;
                        $location.url("/user/" + vm.uid + "/my-lists/" + vm.newList._id);
                    },
                    function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                )
        }

        function deleteList(lid) {
            ListService
                .deleteList(lid)
                .then(
                    init(),
                    function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                )
        }

    }

    function SharedListsController() {
        var vm = this;
    }

    function ListController($routeParams, ListService, MovieService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.lid = $routeParams.lid;

        vm.updateList = updateList;
        vm.deleteMovie = deleteMovie;

        function init() {
            ListService
                .findListById(vm.lid)
                .then(
                    function (response) {
                        vm.list = response.data;
                    },
                    function (error) {
                        vm.error = error;
                    }
                );

            MovieService
                .findMoviesByList(vm.lid)
                .then(
                    function (response) {
                        vm.movies = response.data;
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }
        init();

        function updateList() {
            ListService
                .updateList(vm.lid, vm.list)
                .then (
                    init(),
                    function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                );
        }

        function deleteMovie(mid) {
            MovieService
                .deleteMovie(mid)
                .then (
                    init(),
                    function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                );
        }
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