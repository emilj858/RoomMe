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


        activate();

        ////////////////

        function activate() {
            conversationFactory
                .getAll()
                .then(function(response){
                    vm.conversations = response.data
                });
              }
    }
})();