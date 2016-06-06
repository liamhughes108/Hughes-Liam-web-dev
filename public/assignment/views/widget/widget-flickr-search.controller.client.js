(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, FlickrService, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(
                    function(response) {
                        vm.widget = response.data;
                    }
                )
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            vm.widget.url = url;
            
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId);
                    },
                    function (error) {
                        vm.error = "Unable to select photo";
                    }
                );
        }
        
        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response) {
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();