(function() {
    'use strict';

    angular.module("app")
    .controller('BarLoginController',['$http',BarLoginController]);

    function BarLoginController($http) {
        var vm = this;

        vm.signin = signin;
        vm.username = '';
        vm.password = '';

        function signin() {
            $http.post('/login', {username:vm.username, password:vm.password}).then(function(response) {
                if(response.data.success) {
                    console.log('logged in!');
                } else {
                    console.log('logging failure');
                }
            });
        }
    }
})();