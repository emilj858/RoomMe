(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingMapController', ListingMapController);

    ListingMapController.$inject = ['$stateParams'];

    /* @ngInject */
    function ListingMapController($stateParams) {
        var vm = this;
        vm.title = 'ListingMapController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();