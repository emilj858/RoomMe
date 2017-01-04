(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['authFactory', '$state', '$stateParams'];

    /* @ngInject */
    function LoginController(authFactory, $state, $stateParams) {
        var vm = this;
        vm.title = 'LoginController';

        vm.login = login;

        ////////////////

        function login() {
            authFactory
                .login(vm.username, vm.password)
                .then(function() {
                    $state.go('home');
                })
                .catch(function(error) {
                    console.log(error);

                    alert('Incorrect username or password');
                });
        }
    }
})();