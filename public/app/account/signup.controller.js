(function() {
    'use strict';

    angular.module("app")
    .controller('SignupController',['User','notifier','$location','auth',SignupController]);

    function SignupController(User,notifier,$location,auth) {
        var vm = this;

        vm.signup = signup;
        vm.email;
        vm.password;
        vm.firstName;
        vm.lastName;

        function signup() {
            var newUserData = {
                username: vm.email,
                password: vm.password,
                firstName: vm.fname,
                lastName: vm.lname
            };

            auth.createUser(newUserData).then(function () {
                notifier.notify('User account created!');
            }, function(reason) {
                notifier.error(reason);
            });
        }

    }
})();