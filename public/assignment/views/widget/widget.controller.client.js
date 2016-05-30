(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController)
        .controller("WidgetEditController", WidgetEditController)
        .controller("WidgetListController", WidgetListController);

    function WidgetChooserController(WidgetService) {
        var vm = this;

        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            var newWidget = {
                _id: (new Date()).getTime(),
                widgetType: widgetType
            };
            WidgetService.widget.push(newWidget);
            return widget;
        }
    }

    function WidgetEditController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            vm.widgets = WidgetService.findWidgetsForPageId(vm.pageId);
        }
        init();
    }

    function WidgetListController($routeParams, WidgetService) {
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
            return widget.text;
        }

        function getTrustedUrl(widget) {
            return widget.url;
        }
    }
})();