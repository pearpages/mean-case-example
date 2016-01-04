(function() {
	'use strict';

	angular.module("app")
	.factory('identify',[identify]);

	function identify() {

		this.currentUser = undefined;
		this.isAuthenticated = function() {
			return !!this.currentUser;
		}

		return this;
	}
})();