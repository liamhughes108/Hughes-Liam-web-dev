(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, name) {
            var url = "/api/website/" + websiteId + "/page";
            var newPage = {
                _id: (new Date()).getTime()+"",
                name: name,
                websiteId: websiteId
            };
            return $http.post(url, newPage);
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        function updatePage(pageId, name) {
            var url = "/api/page/" + pageId;
            return $http.get(url, name);
        }

        function deletePage(pageId) {
            var url = "/api/user/" + pageId;
            return $http.delete(url);
        }
    }
})();