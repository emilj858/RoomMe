(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingGridController', ListingGridController);

    ListingGridController.$inject = ['$stateParams'];

    /* @ngInject */
    function ListingGridController($stateParams) {
        var vm = this;
        vm.title = 'ListingGridController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();