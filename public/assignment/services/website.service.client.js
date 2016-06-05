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
                _id: (new Date()).getTime()+"",
                name: name,
                description: desc,
                developerId: developerId
            };
            return $http.post(url, newWebstie);
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            $http.get(url)
                .success(function(response){
                    $scope.websites = response;
                });
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, name, desc) {
            var url = "/api/website/" + websiteId;
            return $http.get(url, name, desc);
        }

        function deleteWebsite(id) {
            var url = "/api/user/" + id;
            return $http.delete(url);
        }
    }
})();