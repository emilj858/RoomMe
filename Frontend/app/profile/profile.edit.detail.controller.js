(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileDetailController', ProfileDetailController);

    ProfileDetailController.$inject = ['$stateParams', 'userFactory'];

    /* @ngInject */
    function ProfileDetailController($stateParams, userFactory) {
        var vm = this;
        vm.title = 'ProfileDetailController';

        ////////////////

        function editProfile(userId, user) {
            userFactory
                .update(userId, user);

        }
    }
})();