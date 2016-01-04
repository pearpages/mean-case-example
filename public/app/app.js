var app = angular.module('app', ['ngResource', 'ngRoute']);

app.value('toastr',toastr); //toastr is not an angular module, it's a javascript library made with jquery

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'MainController',
            controllerAs: 'vm'
        });
});