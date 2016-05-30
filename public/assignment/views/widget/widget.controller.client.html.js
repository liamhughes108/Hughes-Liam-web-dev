(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController)
        .controller("NewWidgetController", NewWidgetController)
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

    function NewWidgetController() {
        var vm = this;
    }

    function WidgetListController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            vm.widgets = WidgetService.findWidgetsForPageId(pageId);
        }
        init();
    }
})();