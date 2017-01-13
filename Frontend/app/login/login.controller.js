(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['authFactory', '$state', '$stateParams', 'SweetAlert'];

    /* @ngInject */
    function LoginController(authFactory, $state, $stateParams, SweetAlert) {
        var vm = this;
        vm.title = 'LoginController';

        vm.login = login;

        vm.registration = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: ''
        };

        vm.register = register;

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

        function register() {
            console.log(vm.registration)
            authFactory
                .register(vm.registration)
                .then(function(response) {
                    SweetAlert.swal('Good job!', 'You created an account.', 'success');
                    authFactory
                        .login(vm.registration.emailAddress, vm.registration.password)
                        .then(function() {
                            $state.go('profile.detail');
                        });
                })
                .catch(function(error) {
                    alert('Bad registration.');
                });
        }
    }
})();
