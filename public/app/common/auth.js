(function() {
	'use strict';

	angular.module("app")
	.factory('auth',['$http','identify','$q',auth]);

	function auth($http,identify,$q) {
		return {
		    authenticateUser: authenticateUser,
		    logoutUser: logoutUser
		}

		function authenticateUser(username, password) {
			var dfd = $q.defer();

			$http.post('/login', {username:username, password:password}).then(function(response) {
                if(response.data.success) {
                    identify.currentUser = response.data.user;
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });

            return dfd.promise;
		}

		function logoutUser() {
			var dfd = $q.defer();
			$http.post('/logout', {logout: true}).then(function () {
				identify.currentUser = undefined;
				dfd.resolve();
			});

			return dfd.promise;
		}
	}
})();