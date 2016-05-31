(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController)
        .controller("WidgetEditController", WidgetEditController)
        .controller("WidgetListController", WidgetListController);

    function WidgetChooserController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            var newWidget = WidgetService.createWidget(vm.pageId, widgetType);
            if (newWidget) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
            } else {
                vm.error = "Unable to create Widget"
            }
        }
    }

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.deleteWidget = deleteWidget;
        vm.updateHeading = updateHeading;
        vm.updateImage = updateImage;
        vm.updateHtml = updateHtml;
        vm.updateYoutube = updateYoutube;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function deleteWidget(widgetId) {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
        
        function updateHeading(text, size) {
            var newWidget = WidgetService.updateHeading(vm.widgetId, text, size);
            if(newWidget) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                wm.error = "Unable to update Widget"
            }
        }
        
        function updateImage(url, width) {
            var newWidget = WidgetService.updateImage(vm.widgetId, url, widget);
            if(newWidget) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                wm.error = "Unable to update Widget"
            }        }

        function updateHtml(text) {
            var newWidget = WidgetService.updateHtml(vm.widgetId, text);
            if(newWidget) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                wm.error = "Unable to update Widget"
            }        }

        function updateYoutube(url, width) {
            var newWidget = WidgetService.updateYoutube(vm.widgetId, url, width);
            if(newWidget) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                wm.error = "Unable to update Widget"
            }        }

    }

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getTrustedUrl = getTrustedUrl;

        function init() {
            vm.widgets = WidgetService.findWidgetsForPageId(vm.pageId);
        }
        init();

        function getTrustedHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }

        function getTrustedUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();