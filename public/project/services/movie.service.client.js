(function () {
    angular
        .module("MovieListShare")
        .factory("MovieService", MovieService);

    function MovieService($http) {

        var api = {
            createMovie: createMovie,
            findMoviesByList: findMoviesByList,
            deleteMovie: deleteMovie
        };
        return api;

        function findMoviesByList(lid) {
            var url = "/api/list/" + lid + "/movie";
            return $http.post(url);
        }
        
        function createMovie(lid, movie) {
            var url = "/api/list/" + lid + "/movie";
            return $http.get(url, movie);
        }

        function deleteMovie(mid) {
            var url = "/api/movie/" + mid;
            return $http.delete(url);
        }
    }
})();