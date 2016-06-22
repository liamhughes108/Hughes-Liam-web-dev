(function () {
    angular
        .module("MovieListShare")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function ProfileController() {
        var vm = this;
    }

    function LoginController() {
        var vm = this;
    }

    function RegisterController() {
        var vm = this;
    }
})
();