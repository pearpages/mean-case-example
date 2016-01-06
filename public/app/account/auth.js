(function() {
    'use strict';

    angular.module("app")
        .factory('auth', ['$http', 'identify', '$q', 'User', auth]);

    function auth($http, identify, $q, User) {
        return {
            authenticateUser: authenticateUser,
            logoutUser: logoutUser,
            authorizeCurrentUserForRoute: authorizeCurrentUserForRoute
        };

        function authenticateUser(username, password) {
            var dfd = $q.defer();

            $http.post('/login', {
                username: username,
                password: password
            }).then(function(response) {
                if (response.data.success) {
                    var user = new User();
                    angular.extend(user, response.data.user);
                    identify.setCurrentUser(user);
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });

            return dfd.promise;
        }

        function logoutUser() {
            var dfd = $q.defer();
            $http.post('/logout', {
                logout: true
            }).then(function() {
                identify.currentUser = undefined;
                dfd.resolve();
            });

            return dfd.promise;
        }

        function authorizeCurrentUserForRoute(role) {
            if (identify.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }
})();
