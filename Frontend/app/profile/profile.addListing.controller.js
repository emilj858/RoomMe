(function() {
    'use strict';

    angular
        .module('app')
        .controller('AddListingController', AddListingController);

    AddListingController.$inject = ['$stateParams', 'listingFactory'];

    /* @ngInject */
    function AddListingController($stateParams, listingFactory) {
        var vm = this;
        vm.title = 'AddListingController';
        vm.addListing = addListing;
        
        vm.newListing = {
            price: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            description: ''
        };

        ///////////////////

        function addListing() {
            listingFactory
            .create(vm.newListing);
            console.log("successful");
            vm.newListing = {};

        }

        function addCoordiantes(address){
            vm.address = address.address + ", " + address.city + " " + address.state + " " + address.zip;
        }
    }
})();