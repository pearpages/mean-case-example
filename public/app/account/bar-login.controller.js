(function() {
    'use strict';

    angular.module("app")
    .controller('BarLoginController',[BarLoginController]);

    function BarLoginController() {
        var vm = this;

        vm.signin = signin;

        function signin(username, password) {
            console.log("I'm not done yet");
        }
    }
})();