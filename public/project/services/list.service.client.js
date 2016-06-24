(function () {
    angular
        .module("MovieListShare")
        .factory("ListService", ListService);

    function ListService($http) {

        var api = {
            findMyListsByUser: findMyListsByUser,
            createList: createList,
            deleteList: deleteList,
            findListById: findListById,
            updateList: updateList
        };
        return api;
        
        function findMyListsByUser(uid) {
            var url = "/api/user/" + uid + "/list";
            return $http.get(url);
        }
        
        function createList(uid) {
            var url = "/api/user/" + uid + "/list";
            var list = {}
            return $http.post(url, list);
        }
        
        function deleteList(lid) {
            var url = "/api/list/" + lid;
            return $http.delete(url);
        }

        function findListById(lid){
            var url = "/api/list/" + lid;
            return $http.get(url);
        }

        function updateList(lid, list) {
            var url = "/api/list/" + lid;
            return $http.put(url, list);
        }
    }
})();