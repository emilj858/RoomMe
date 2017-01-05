(function() {
    'use strict';

    angular
        .module('app')
        .controller('editListingController', editListingController);

    editListingController.$inject = ['$stateParams', 'listingFactory'];

    /* @ngInject */
    function editListingController($stateParams, listingFactory) {
        var vm = this;
        vm.title = 'editListingController';
        vm. editListing = editListing;

//might have to change listing Id to vm.listingId or something connected to angular

        function editListing(listingId, listing){
        	listingFactory
        		.update(listingId, listing)
        }
    }
})();