(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController);

    function EditPageController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.page = PageService.findPagesByWebsite(vm.websiteId);
        }
        init();

        function updatePage(pageId, name, title) {
            var newPage = PageService.updatePage(pageId, name, title);
            if(newPage) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Unable to update website";
            }
        }

        function deletePage(pageId) {
            var result = PageService.deletePage(pageId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Unable to delete website";
            }
        }
    }

    function NewPageController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(name, description) {
            var newPage = PageService.createPage(vm.websiteId, name, title);
            if(newPage) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Unable to create website";
            }
        }
    }

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }
})();