(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingDetailController', ListingDetailController);

    ListingDetailController.$inject = ['$stateParams', 'userFactory', 'listingFactory', 'SweetAlert'/*, 'ngMaps'*/];

    /* @ngInject */
    function ListingDetailController($stateParams, userFactory, listingFactory, SweetAlert/*, ngMaps*/) {
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
        		.getById($stateParams.id)
        		.then(function(response){
        			vm.currentListing = response.data;
                    console.log(vm.currentListing)
        		});
        }
        function addFavorite(listingId) {
            userFactory
                .addFavoriteToUser(listingId)
                .then(function(response) {
                    SweetAlert.swal('Success', 'Listing added to favorites, you can find favorites in your profile.', 'success');
                });
        }

        function deleteFavorite(listingId) {
            userFactory
                .removeFavoriteFromUser(listingId);
        }
    }
})();