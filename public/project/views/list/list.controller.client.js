(function () {
    angular
        .module("MovieListShare")
        .controller("MyListsController", MyListsController)
        .controller("SharedListsController", SharedListsController)
        .controller("ListController", ListController)
        .controller("ListSharedController", ListSharedController);

    function MyListsController($routeParams, ListService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createList = createList;
        vm.deleteList = deleteList;
        vm.shareList = shareList;
        vm.unshareList = unshareList;

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
                );
        }

        function shareList(lid) {
            ListService
                .shareList(lid)
                .then(
                    init(),
                    function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                );
        }

        function unshareList(lid) {
            ListService
                .unshareList(lid)
                .then(
                    init(),
                    function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                );
        }
    }

    function SharedListsController($routeParams, ListService, PUserService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.lists = [];
        vm.username = [];

        function init() {
            PUserService
                .findUserById(vm.uid)
                .then(
                    function (response) {
                        vm.user = response.data;
                        vm.friends = vm.user.friends;

                        initHelper(0);
                    },
                    function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                );
        }

        init();

        function initHelper(index) {
            vm.username[index] = vm.friends[index].username;
            ListService
                .findSharedListsByUser(vm.friends[index]._id)
                .then(
                    function (response) {
                        var sharedList = response.data;
                        for (var j = 0; j < sharedList.length; j++) {
                            sharedList[j].friend = vm.username[index];
                            vm.lists.push(sharedList[j]);
                        }
                        index+=1;
                        if(index < vm.friends.length) {
                            initHelper(index);
                        }
                    },
                    function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                );
        }
    }

    function ListController($routeParams, ListService, MovieService) {
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
                .then(
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
                .then(
                    init(),
                    function (error) {
                        console.log(error);
                        vm.error = error;
                    }
                );
        }
    }

    function ListSharedController($routeParams, ListService, MovieService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.lid = $routeParams.lid;

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
    }
})
();