(function() {
    'use strict';

    angular
        .module('app')
        .factory('messageFactory', messageFactory);

    messageFactory.$inject = ['$http'];

    /* @ngInject */
    function messageFactory($http) {
        var service = {
            getAll: getAll,
            create: create
        };
        return service;

        ////////////////

        function getAll() {
        	return $http
        		.get('');
        }

        function create(obj) {
        	return $http
        		.post('', obj)
        }
    }
})();