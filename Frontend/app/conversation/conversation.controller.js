(function() {
    'use strict';

    angular
        .module('app')
        .controller('conversationController', conversationController);

    conversationController.$inject = ['conversationFactory', '$stateParams'];

    /* @ngInject */
    function conversationController(conversationFactory, $stateParams) {
        var vm = this;
        vm.title = 'conversationController';


        activate();

        ////////////////

        function activate() {
      
        }
    }
})();