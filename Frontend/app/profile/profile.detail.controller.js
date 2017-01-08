(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileDetailController', ProfileDetailController);

    ProfileDetailController.$inject = ['$stateParams', 'conversationFactory', 'userFactory'];

    /* @ngInject */
    function ProfileDetailController($stateParams, conversationFactory, userFactory) {
        var vm = this;
        vm.title = 'ProfileDetailController';
        vm.currentUser;

        activate();

        ////////////////

        function activate() {
            // conversationFactory
            //     .getAll()
            //     .then(function(response) {
            //         vm.conversations = response.data;
            //     });
                console.log('hellllllo')
            userFactory
                .getById($stateParams.id)
                .then(function(response){
                    vm.currentUser = response.data;
                    console.log(vm.currentUser);
                });

        }
    }
})();