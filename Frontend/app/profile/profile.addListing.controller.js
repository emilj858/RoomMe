(function() {
    'use strict';

    angular
        .module('app')
        .controller('AddListingController', AddListingController);

    AddListingController.$inject = ['$stateParams', 'listingFactory', '$state', 'SweetAlert'];

    /* @ngInject */
    function AddListingController($stateParams, listingFactory, $state, SweetAlert) {
        var vm = this;
        vm.title = 'AddListingController';
        vm.addListing = addListing;
        vm.onImageAdded = onImageAdded;

        vm.newListing = {
            price: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            description: '',
            listingPhotoes: []
        };

        ///////////////////

        function addListing() {
            listingFactory
                .create(vm.newListing)
                .then(function() {
                    SweetAlert.swal('Good job!', 'You created a listing.', 'success');
                    vm.newListing = {};
                    $state.go('profile.detail');
                });

        }

        function onImageAdded() {
            vm.newListing.listingPhotoes.push({
                url: vm.newImage
            });
        }

        function addCoordiantes(address) {
            vm.address = address.address + ", " + address.city + " " + address.state + " " + address.zip;
        }
    }
})();
