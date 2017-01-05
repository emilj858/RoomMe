(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListingGridController', ListingGridController);

    ListingGridController.$inject = ['$stateParams', 'listingFactory', 'ngMap'];

    /* @ngInject */
    function ListingGridController($stateParams, listingFactory, ngMap) {
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

                //If we want current locaation

           // navigator.geolocation.getCurrentPosition(function(position) {
           //vm.currentPosition = [
        //    position.coords.latitude,
            //    position.coords.longitude
            //];
    //     });

        }
    }
})();