(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['authFactory', '$state', '$stateParams'];

    /* @ngInject */
    function RegisterController(authFactory, $state, $stateParams) {
        var vm = this;
        vm.title = 'RegisterController';

        vm.registration = {
            username: '',
            emailAddress: '',
            password: '',
            confirmPassword: ''
        };

        vm.register = register;

        ////////////////

        function register() {
            authFactory
                .register(vm.registration)
                .then(function(response) {
                    alert('Successful registration! Now login');
                    $state.go('login');
                })
                .catch(function(error) {
                    alert('Bad registration.');
                });
        }
    }
})();