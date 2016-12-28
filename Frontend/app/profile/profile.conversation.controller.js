(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileConversation', ProfileConversation);

    ProfileConversation.$inject = ['$stateParams'];

    /* @ngInject */
    function ProfileConversation($stateParams) {
        var vm = this;
        vm.title = 'ProfileConversation';

        activate();

        ////////////////

        function activate() {
        }
    }
})();