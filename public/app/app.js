var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main',
            controller: 'MainController',
            controllerAs: 'vm'
        });
});