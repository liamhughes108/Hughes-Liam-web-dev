(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(developerId, name, desc) {
            var url = "/api/user/" + developerId + "/website";
            var newWebsite = {
                name: name,
                description: desc,
                developerId: developerId
            };
            return $http.post(url, user);
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/" + developerId + "/website";
            return $http.get(url)
                .success(function(response){
                    $scope.courses = response;
                });
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + id;
            return $http.get(url);
        }

        function updateWebsite(websiteId, name, desc) {
            var url = "/api/website/" + id;
            return $http.get(url);
        }

        function deleteWebsite(id) {
            var url = "/api/user/" + id;
            return $http.delete(url);
        }
    }
})();