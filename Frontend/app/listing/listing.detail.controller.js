(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingDetailController', ListingDetailController);

    ListingDetailController.$inject = ['$stateParams', 'userFactory', 'listingFactory'];

    /* @ngInject */
    function ListingDetailController($stateParams, userFactory, listingFactory) {
        var vm = this;
        vm.title = 'ListingDetailController';
        vm.currentListing = [];
        vm.currentListingUser;
        vm.addFavorite = addFavorite;
        vm.deleteFavorite = deleteFavorite;

        activate();

        ////////////////

        function activate() {
        	listingFactory
        		.getById(listingId)
        		.then(function(response){
        			vm.currentListing = response.data;
        		});
        	
        	userFactory
        		.getById(vm.currentListing.userId)
                .then(function(response){
                    vm.currentListingUser = response.data;
    // If this breaks add $q 
                });

        }
        function addFavorite(listingId, userId) {
            userFactory
                .addFavoriteToUser(listingId, userId);
        }

        function deleteFavorite(listingId, userId) {
            userFactory
                .removeFavoriteFromUser(listingId, userId);
        }
    }
})();