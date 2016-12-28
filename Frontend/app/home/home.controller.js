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

       

        ////////////////

        function () {
        }
    }
})();