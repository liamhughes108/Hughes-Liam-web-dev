(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController);

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(
                    function (response) {
                        vm.page = response.data;
                    }
                );
        }

        init();

        function updatePage(pageId, page) {
            PageService
                .updatePage(pageId, page)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function (error) {
                        vm.error = "Unable to update page";
                    }
                );
        }

        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function (error) {
                        vm.error = "Unable to delete page";
                    }
                );
        }
    }

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(name, title) {
            PageService
                .createPage(vm.websiteId, name, title)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function (error) {
                        vm.error = "Unable to create page";
                    }

                );
        }
    }

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(
                    function (response) {
                        vm.pages = response.data;
                    }
                );
        }

        init();
    }
})();