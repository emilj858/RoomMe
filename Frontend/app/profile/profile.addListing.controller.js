(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileAddListing', ProfileAddListing);

    ProfileAddListing.$inject = ['$stateParams', 'listingFactory'];

    /* @ngInject */
    function ProfileAddListing($stateParams, listingFactory) {
        var vm = this;
        vm.title = 'ProfileAddListing';
        vm.addListing = addListing;
        vm.address;

        ///////////////////

        function addListing(listing) {
            listingFactory
            .create(listing);

        }

        function addCoordiantes(address){
            vm.address = address.address + ", " + address.city + " " + address.state + " " + address.zip;
        }
    }
})();