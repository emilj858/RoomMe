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

       activate();

        ////////////////

        function activate() {
            userFactory
                .getById($stateParams.id)
                .then(function(response){
                    vm.currentUser = response.data;
                });
            }


        function editProfile(userId, user) {
            userFactory
                .update(userId, user);

        }

    }
})();