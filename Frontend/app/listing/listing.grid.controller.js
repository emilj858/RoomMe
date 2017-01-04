(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingGridController', ListingGridController);

    ListingGridController.$inject = ['$stateParams', 'listingFactory'];

    /* @ngInject */
    function ListingGridController($stateParams, listingFactory) {
        var vm = this;
        vm.title = 'ListingGridController';
        vm.listings = [];

        activate();

        ////////////////

        function activate() {
            listingFactory
                .getAll()
                .then(function(response){
                    vm.listings = response.data;
                });
        }
    }
})();