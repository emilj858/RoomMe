(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileAddListing', ProfileAddListing);

    ProfileAddListing.$inject = ['$stateParams'];

    /* @ngInject */
    function ProfileAddListing($stateParams) {
        var vm = this;
        vm.title = 'ProfileAddListing';

        activate();

        ////////////////

        function activate() {
        }
    }
})();