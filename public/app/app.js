var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main',
            controller: 'MainController',
            controllerAs: 'vm'
        });
});

app.controller('MainController', [MainController]);

function MainController() {
    var vm = this;

    vm.myVar = 'Hello Angular';
}