(function() {
    'use strict';

    angular.module("app")
    .controller('BarLoginController',['$http','notifier','identify','auth','$location',BarLoginController]);

    function BarLoginController($http,notifier,identify,auth,$location) {
        var vm = this;

        vm.signin = signin;
        vm.signout = signout;
        vm.username = '';
        vm.password = '';
        vm.identify = identify;

        function signin() {
            auth.authenticateUser(vm.username,vm.password)
            .then(function (success) {
                if (success) {
                    notifier.notify('logged');
                }else{
                    notifier.notify('not logged!!');
                }
            });
        }

        function signout() {
            auth.logoutUser().then(function () {
                vm.username = '';
                vm.password = '';
                notifier.notify('You have successfully signed out');
                $location.path('/');
            });
        }
    }
})();