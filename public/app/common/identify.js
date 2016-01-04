(function() {
	'use strict';

	angular.module("app")
	.factory('identify',[identify]);

	function identify() {
		return {
			currentUser: undefined,
			isAuthenticated: function() {
				return !!this.currentUser;
			}
		}
	}
})();