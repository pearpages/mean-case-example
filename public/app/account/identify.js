(function() {
	'use strict';

	angular.module("app")
	.factory('identify',['$window','User',identify]);

	function identify($window,User) {

		var currentUser;
		if(!!$window.bootstrappedUserObject){
			currentUser = new User();
			angular.extend(currentUser, $window.bootstrappedUserObject);	
		}

		return {
			getCurrentUser: function () {
				return currentUser;
			},
			setCurrentUser: function (user) {
				currentUser = user;
			},
			isAuthenticated: function() {
				return !!currentUser;
			},
			isAuthorized: function (role) {
				return currentUser && currentUser.roles.indexOf(role) > -1 ;
			}
		};
	}
})();