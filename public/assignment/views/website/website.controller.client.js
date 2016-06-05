(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(websiteId)
                .then(
                    function (response) {
                        vm.website = response.data;
                    }
                );
        }

        init();

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website");
                    },
                    function (error) {
                        vm.error = "Unable to delete website";
                    }
                );
        }

        function updateWebsite(websiteId, name, desc) {
            WebsiteService
                .updateWebsite(websiteId, name, desc)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website");
                    },
                    function (error) {
                        vm.error = "Unable to update website";
                    }
                );
        }
    }

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(
                    function (response) {
                        vm.websites = response.data;
                    }
                );
        }

        init();
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            WebsiteService
                .createWebsite(vm.userId, name, description)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website");
                    },
                    function (error) {
                        vm.error = "Unable to create website";
                    }
                );
        }
    }
})();