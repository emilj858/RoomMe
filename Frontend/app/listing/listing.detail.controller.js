(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingDetailController', ListingDetailController);

    ListingDetailController.$inject = ['$stateParams', 'listingPhotoFactory', 'userFactory', 'listingFactory'];

    /* @ngInject */
    function ListingDetailController($stateParams, listingPhotoFactory, userFactory, listingFactory) {
        var vm = this;
        vm.title = 'ListingDetailController';
        vm.currentListing = [];
        vm.photoes = [];


        activate();

        ////////////////

        function activate() {
        	listingFactory
        		.getById(listingId)
        		.then(function(response){
        			vm.currentListing = response.data;
        		});
        	
        	userFactory
        		.getById(userId);
        }

    }
})();