(function() {
	'use strict';

	angular.module("app")
	.factory('identify',['$window',identify]);

	function identify($window) {

		if(!!$window.bootstrappedUserObject) {
			this.currentUser = $window.bootstrappedUserObject;
		} else {
			this.currentUser = undefined;	
		}
		
		this.isAuthenticated = function() {
			return !!this.currentUser;
		}

		return this;
	}
})();