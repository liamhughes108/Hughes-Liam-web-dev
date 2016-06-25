(function () {
    angular
        .module("MovieListShare")
        .factory("MovieService", MovieService);

    function MovieService($http) {

        var api = {
            findMoviesByList: findMoviesByList,
            deleteMovie: deleteMovie
        };
        return api;

        function findMoviesByList(lid) {
            var url = "/api/list/" + lid + "/movie";
            return $http.get(url);
        }

        function deleteMovie(mid) {
            var url = "/api/movie/" + mid;
            return $http.delete(url);
        }
    }
})();