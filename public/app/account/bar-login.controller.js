(function() {
    'use strict';

    angular.module("app")
    .controller('BarLoginController',['$http','notifier','identify','auth',BarLoginController]);

    function BarLoginController($http,notifier,identify,auth) {
        var vm = this;

        vm.signin = signin;
        vm.username = '';
        vm.password = '';
        vm.currentUser = identify;

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
    }
})();