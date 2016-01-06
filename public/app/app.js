var app = angular.module('app', ['ngResource', 'ngRoute']);

app.value('toastr',toastr); //toastr is not an angular module, it's a javascript library made with jquery

app.config(function($routeProvider, $locationProvider) {
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
            resolve: {
                auth : function (identify, $q) {
                    if(identify.getCurrentUser() && identify.getCurrentUser().roles.indexOf('admin') > -1){
                        return true;
                    } else {
                        return $q.reject('not authorized');
                    }
                }
            }
        });
});

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    });
});