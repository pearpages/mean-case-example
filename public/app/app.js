var app = angular.module('app', ['ngResource', 'ngRoute']);

app.value('toastr', toastr); //toastr is not an angular module, it's a javascript library made with jquery

app.config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {
            auth: function(auth) {
                return auth.authorizeCurrentUserForRoute('admin');
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'MainController',
            controllerAs: 'vm'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'UserListController',
            controllerAs: 'vm',
            resolve: routeRoleChecks.admin
        });
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});
