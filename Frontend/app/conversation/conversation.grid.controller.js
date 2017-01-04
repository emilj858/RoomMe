(function() {
    'use strict';

    angular
        .module('app')
        .controller('conversationController', conversationController);

    conversationController.$inject = ['conversationFactory', '$stateParams','messageFactory'];

    /* @ngInject */
    function conversationController(conversationFactory, $stateParams, messageFactory) {
        var vm = this;
        vm.title = 'conversationController';
        vm.conversations = [];
        vm.createConversation = createConversation;

        activate();

        ////////////////

        function activate() {
            conversationFactory
                .getAll()
                .then(function(response){
                    vm.conversations = response.data
                });
              }
        function createConversation(conversation) {
            conversationFactory
                .create(conversation)
                .then(function() {
                    $state.go('conversation.detail');
                })

        }
    }
})();