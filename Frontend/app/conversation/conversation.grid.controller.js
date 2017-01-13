(function() {
    'use strict';

    angular
        .module('app')
        .controller('ConversationGridController', ConversationGridController);

    ConversationGridController.$inject = ['userFactory'];

    /* @ngInject */
    function ConversationGridController(userFactory) {
        var vm = this;
        vm.title = 'ConversationGridController';
        vm.conversations = [];
        vm.email;

        activate();

        ////////////////

        function activate() {
            userFactory
                .getMe()
                .then(function(response) {
                    vm.conversations = response.data.conversations;
                    vm.email = response.data.email;
                })
        }
    }
})();
