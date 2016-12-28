(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$stateParams'];

    /* @ngInject */
    function LoginController($stateParams) {
        var vm = this;
        vm.title = 'LoginController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();