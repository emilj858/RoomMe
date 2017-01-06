(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$stateParams'];

    /* @ngInject */
    function HomeController($stateParams) {
        var vm = this;
        vm.title = 'HomeController';

       
        // If we use UI view delete this otherwise we need a function for the search button
        ////////////////

    }
})();