(function() {
	'use strict';

	angular.module("app")
	.factory('notifier',['toastr',notifier]);

	function notifier(toastr) {
		return {
			notify: function(msg) {
				toastr.success(msg);
			},
			error: function(msg) {
				toastr.error(msg);
			}
		};
	}
})();