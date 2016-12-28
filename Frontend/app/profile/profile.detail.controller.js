(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileDetail', ProfileDetail);

    ProfileDetail.$inject = ['$stateParams'];

    /* @ngInject */
    function ProfileDetail($stateParams) {
        var vm = this;
        vm.title = 'ProfileDetail';

        activate();

        ////////////////

        function activate() {
        }
    }
})();