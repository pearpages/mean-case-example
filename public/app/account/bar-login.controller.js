(function() {
    'use strict';

    angular.module("app")
    .controller('BarLoginController',['$http','notifier','identify',BarLoginController]);

    function BarLoginController($http,notifier,identify) {
        var vm = this;

        vm.signin = signin;
        vm.username = '';
        vm.password = '';

        function signin() {
            $http.post('/login', {username:vm.username, password:vm.password}).then(function(response) {
                if(response.data.success) {
                    identify.currentUser = response.data.user;
                    notifier.notify('logged in!');
                } else {
                    notifier.notify('logging failure');
                }
            });
        }
    }
})();