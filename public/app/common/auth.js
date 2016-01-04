(function() {
	'use strict';

	angular.module("app")
	.factory('auth',['$http','identify','$q',auth]);

	function auth($http,identify,$q) {
		return {
			authenticateUser: authenticateUser
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
	}
})();