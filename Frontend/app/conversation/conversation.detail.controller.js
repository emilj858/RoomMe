(function() {
    'use strict';

    angular
        .module('app')
        .controller('conversationDetailController', conversationDetailController);

    conversationDetailController.$inject = ['conversationFactory', '$stateParams', 'messageFactory'];

    /* @ngInject */
    function conversationDetailController(conversationFactory, $stateParams, messageFactory) {
        var vm = this;
        vm.title = 'conversationDetailController';
        vm.messages = [];
        vm.currentConversation;
        vm.addMessage = addMessage;

        activate();

        ////////////////

        function activate() {
        	messageFactory
        		.getAll()
        		.then(function(response) {
					vm.messages = response.data;
        		})
        	conversationFactory
        		.getById($stateParams.id)
        		.then(function(response) {
        			vm.currentConversation = response.data;
        		})
        		
        }
        function addMessage(message) {
        	messageFactory
        		.create(message);
        }
    }
})();