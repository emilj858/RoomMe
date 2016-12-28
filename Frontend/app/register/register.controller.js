(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$stateParams'];

    /* @ngInject */
    function RegisterController($stateParams) {
        var vm = this;
        vm.title = 'RegisterController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();