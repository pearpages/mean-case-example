(function() {
    'use strict';

    angular.module("app")
        .controller('MainController', [MainController]);

    function MainController() {
        var vm = this;

        vm.courses = [{
            name: 'Lorem ipsum dolor.',
            featured: true,
            published: new Date()
        }, {
            name: 'Lorem ipsum dolor.',
            featured: true,
            published: new Date()
        }, {
            name: 'Lorem ipsum dolor.',
            featured: true,
            published: new Date()
        }, {
            name: 'Lorem ipsum dolor.',
            featured: true,
            published: new Date()
        },{
            name: 'Lorem ipsum dolor.',
            featured: false,
            published: new Date()
        },{
            name: 'Lorem ipsum dolor.',
            featured: false,
            published: new Date()
        }, {
            name: 'Lorem ipsum dolor.',
            featured: false,
            published: new Date()
        }, {
            name: 'Lorem ipsum dolor.',
            featured: false,
            published: new Date()
        }, {
            name: 'Lorem ipsum dolor.',
            featured: false,
            published: new Date()
        },  
        ];
    }
})();
