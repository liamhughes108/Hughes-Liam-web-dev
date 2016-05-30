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
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/");
            } else {
                vm.error = "Unable to update website";
            }
        }

        function deletePage(pageId) {

        }
    }

    function NewPageController() {
        var vm = this;
    }

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            vm.pages = PageService.findPagesByWebsite(vm.websiteId);
        }
        init();
    }
})();