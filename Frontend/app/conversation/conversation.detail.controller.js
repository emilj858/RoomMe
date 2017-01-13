(function() {
    'use strict';

    angular
        .module('app')
        .controller('ConversationDetailController', ConversationDetailController);

    ConversationDetailController.$inject = ['conversationFactory', '$stateParams', 'messageFactory', 'userFactory'];

    /* @ngInject */
    function ConversationDetailController(conversationFactory, $stateParams, messageFactory, userFactory) {
        var vm = this;
        vm.title = 'ConversationDetailController';
        vm.messages = [];
        vm.currentConversation;
        vm.addMessage = addMessage;
        //vm.sender;
        
        

        activate();

        ////////////////

        function activate() {
            // // userFactory
            // //     .getMe()
            // //     .then(function(response) {
            // //         vm.sender = response.data.email;
            //     });
            vm.loading = true;
            if ($stateParams.id) {
                // get the conversation if it exists
                conversationFactory
                    .getById($stateParams.id)
                    .then(function(response) {
                        vm.conversation = response.data;
                        vm.loading = false;
                    })
            } else {
                // ok, no conversation...

                // get the currently logged in user
                userFactory
                    .getMe()
                    .then(function(response) {
                        // create a conversation..
                        conversationFactory
                            .create({
                                user1Id: response.data.id, // .. where the user1id is me
                                user2Id: $stateParams.userId // .. and the user2id is the person I'm sending this message to
                            })
                            .then(function(response2) {
                                vm.conversation = response2.data;
                                vm.conversation.messages = [];
                                vm.loading = false;
                            });
                    });
            }
        }

        function addMessage(message) {
            // binds this message to the conversation we created in activate()
            message.conversationId = vm.conversation.conversationId;
            //message.sender = vm.sender;
            messageFactory
                .create(message)
                .then(function(response) {
                    vm.conversation.messages.push(response.data);
                    console.log("Message Created")
                    console.log(message);
                    console.log(vm.conversation);
                })

        }
    }
})();
