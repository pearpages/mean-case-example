(function() {
    'use strict';

    angular.module("app")
    .controller('UserListController',['User',UserListController]);

    function UserListController(User) {
        var vm = this;

        vm.users;

        activate();

        function activate() {
            vm.users = User.query();
        }
    }
})();