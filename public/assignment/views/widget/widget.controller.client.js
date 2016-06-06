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
            WidgetService
                .createWidget(vm.pageId, widgetType)
                .then(
                    function (response) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
                    },
                    function (error) {
                        vm.error = "Unable to create Widget"

                    }
                );
        }
    }

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        function init() {
            console.log(vm.widgetId);
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(
                    function (response) {
                        vm.widget = response.data;
                    }                    
                );
        }
        init();

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(widgetId)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    },
                    function (error) {
                        vm.error = "Unable to delete widget";
                    }
                );
        }
        
        function updateWidget(text, size) {
            WidgetService
                .updateHeading(vm.widgetId, vm.widget)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    },
                    function (error) {
                        vm.error = "Unable to update Widget"
                    }
                );
        }
        
        function updateImage(url, width) {
            var newWidget = WidgetService.updateImage(vm.widgetId, url, widget);
            if(newWidget) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Unable to update Widget"
            }        }

        function updateHtml(text) {
            var newWidget = WidgetService.updateHtml(vm.widgetId, text);
            if(newWidget) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Unable to update Widget"
            }        }

        function updateYoutube(url, width) {
            var newWidget = WidgetService.updateYoutube(vm.widgetId, url, width);
            if(newWidget) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Unable to update Widget"
            }        }

    }

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getTrustedUrl = getTrustedUrl;

        $(".widget-container")
            .sortable({axis: "y"});

        function init() {
            WidgetService
                .findWidgetsForPageId(vm.pageId)
                .then(
                    function (response) {
                        vm.widgets = response.data;
                    }
                );
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