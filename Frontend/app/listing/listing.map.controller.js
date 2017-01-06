(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingMapController', ListingMapController);

    ListingMapController.$inject = ['$stateParams', 'listingFactory'];

    /* @ngInject */
    function ListingMapController($stateParams, listingFactory) {
        var vm = this;
        vm.title = 'ListingMapController';
        vm.mapListings = [];

        activate();

        ////////////////

        function activate() {
            listingFactory
                .getAll()
                .then(function(response){
                    vm.mapListings = response.data;
                });
        }
    }
})();