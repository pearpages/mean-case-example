(function() {
    'use strict';

    angular.module("app")
    .factory('User',['$resource',User]);

    function User($resource) {
        var UserResource = $resource('/api/users/:id', {_id: "@id"});

        UserResource.prototype.isAdmin = function () {
            return this.roles  && this.roles.indexOf('admin') > -1;
        };

        return UserResource;
    }
})();