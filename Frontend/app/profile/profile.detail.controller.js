(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileDetailController', ProfileDetailController);

    ProfileDetailController.$inject = ['$stateParams', 'conversationFactory'];

    /* @ngInject */
    function ProfileDetailController($stateParams, conversationFactory) {
        var vm = this;
        vm.title = 'ProfileDetailController';

        activate();

        ////////////////

        function activate() {
            conversationFactory
                .getAll()
                .then(function(response) {
                    vm.conversations = response.data;
                });
        }
    }
})();