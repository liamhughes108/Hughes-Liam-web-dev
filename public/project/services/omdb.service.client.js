(function () {
    angular
        .module("MovieListShare")
        .factory("OMDbService", OMDbService);

    var urlBase = "http://www.omdbapi.com/?s=SEARCH&page=1&r=json";

    function OMDbService($http) {

        var api = {
            searchMovies: searchMovies
        };
        return api;

        function searchMovies(searchTerm) {
            var url = urlBase.replace("SEARCH", searchTerm);
            return $http.get(url);
        }
    }
})();