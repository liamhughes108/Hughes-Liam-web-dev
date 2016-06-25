(function(){
    angular
        .module("MovieListShare")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, OMDbService, ListService, MovieService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.lid = $routeParams.lid;
        vm.searchMovies = searchMovies;
        vm.selectMovie = selectMovie;

        function init() {
            ListService
                .findListById(vm.lid)
                .then(
                    function (response) {
                        vm.list = response.data;
                    }
                );
        }
        init();

        function selectMovie(movie) {
            var newMovie = {
                title: movie.Title,
                poster: movie.Poster
            };

            MovieService
                .createMovie(vm.lid, newMovie)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.uid + "/my-lists/" + vm.lid)
                    },
                    function (error) {
                        vm.error = "Unable to select movie"
                    }
                )
        }

        function searchMovies(searchText) {
            OMDbService
                .searchMovies(searchText)
                .then(
                    function (response) {
                        vm.movies = response.data.Search;
                    },
                    function (error) {
                        console.log(error);
                        vm.error = error.data;
                    }
                )
        }
    }
})();